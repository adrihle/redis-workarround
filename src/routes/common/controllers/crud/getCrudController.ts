import { HttpStatus } from '@nestjs/common';
import { Body, Controller, Inject, Param, Query } from '@nestjs/common';
import {
  ApiProperty,
  ApiTags,
  IntersectionType,
  OmitType,
} from '@nestjs/swagger';
import { CrudModuleConfig } from './crud.module';
import { CrudService } from './crud.service';
import { MongoSchema } from '@repository/helpers';
import { Pipes, Decorators } from '@providers';
import { getControllerParam } from './getControllerParams';
import { ERRORS, PaginationQueryDTO, PaginationResponseDTO } from '@routes/common';

const renameClass = (originalClass: { new () }, newName: string) => {
  Object.defineProperty(originalClass, 'name', { value: newName });
};

const { NOT_FOUND, BAD_REQUEST } = ERRORS;
const { MongoIdValidation } = Pipes;
const { Endpoint } = Decorators;

const BASE_CRUD = 'crud';

export const getCrudController = <T>(config: CrudModuleConfig<T>) => {
  const { routeBase, DTO } = config;
  class Dto extends DTO {}
  renameClass(Dto, DTO.name);
  class DocumentDto extends IntersectionType(Dto, MongoSchema) {}
  renameClass(DocumentDto, `Document${DTO.name}`);
  class PaginationResponse extends OmitType(PaginationResponseDTO<T>, [
    'results',
  ]) {
    @ApiProperty({ type: DocumentDto, isArray: true })
    results: DocumentDto[];
  }
  renameClass(PaginationResponse, `Pagination${DTO.name}`);

  const { sanitizedRoute, controllerName } = getControllerParam(routeBase);

  @ApiTags(sanitizedRoute)
  @Controller(`${sanitizedRoute}/${BASE_CRUD}`)
  class CrudController {
    @Inject()
    readonly service: CrudService<T>;

    @Endpoint({
      path: ':id',
      verb: 'GET',
      okResponse: { type: DocumentDto, status: HttpStatus.OK },
      errorResponse: [NOT_FOUND],
    })
    crudGet(@Param('id', MongoIdValidation) id: string) {
      return this.service._get(id);
    }

    @Endpoint({
      verb: 'GET',
      okResponse: { type: PaginationResponse, status: HttpStatus.OK },
    })
    crudPagination(@Query() query: PaginationQueryDTO) {
      return this.service._pagination(query);
    }

    @Endpoint({
      verb: 'POST',
      okResponse: { type: DocumentDto, status: HttpStatus.CREATED },
      errorResponse: [BAD_REQUEST],
    })
    crudCreate(@Body() body: Dto) {
      return this.service._create(body);
    }

    @Endpoint({
      path: ':id',
      verb: 'PUT',
      okResponse: { type: DocumentDto, status: HttpStatus.OK },
      errorResponse: [BAD_REQUEST, NOT_FOUND],
    })
    crudUpdate(
      @Param('id', MongoIdValidation) id: string,
      @Body() body: Partial<Dto>,
    ) {
      return this.service._update(id, body);
    }

    @Endpoint({
      path: ':id',
      verb: 'DEL',
      okResponse: { type: DocumentDto, status: HttpStatus.CREATED },
      errorResponse: [NOT_FOUND],
    })
    crudRemove(@Param('id', MongoIdValidation) id: string) {
      return this.service._remove(id);
    }
  }

  renameClass(CrudController, `${controllerName}CrudController`);
  return CrudController;
};
