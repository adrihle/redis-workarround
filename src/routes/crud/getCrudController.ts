import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, IntersectionType } from '@nestjs/swagger';
import { CrudModuleConfig } from './crud.module';
import { CrudService } from './crud.service';
import { MongoSchema } from '@repository/helpers';
import { PaginationQueryDTO } from '@routes/common/dtos';
import { Pipes } from '@providers';

const getControllerParam = (route: string) => {
  const sanitizedRoute = route.split(' ').join('');
  const controllerName =
    sanitizedRoute.charAt(0).toUpperCase() + sanitizedRoute.slice(1);
  return {
    sanitizedRoute,
    controllerName,
  };
};

const { MongoIdValidation } = Pipes;

const BASE_CRUD = 'crud';

const getCrudController = <T>(config: CrudModuleConfig<T>) => {
  const { routeBase, DTO } = config;
  class Dto extends DTO {}
  Object.defineProperty(Dto, 'name', { value: DTO.name });
  class DocumentDto extends IntersectionType(Dto, MongoSchema) {}
  Object.defineProperty(DocumentDto, 'name', { value: `Document${DTO.name}` });

  const { sanitizedRoute, controllerName } = getControllerParam(routeBase);

  @ApiTags(sanitizedRoute)
  @Controller(`${sanitizedRoute}/${BASE_CRUD}`)
  class CrudController {
    @Inject()
    readonly service: CrudService<T>;

    @Get(':id')
    crudGet(@Param('id', MongoIdValidation) id: string) {
      return this.service._get(id);
    }

    @Get()
    crudPagination(@Query() query: PaginationQueryDTO) {
      return this.service._pagination(query);
    }

    @Post()
    crudCreate(@Body() body: Dto) {
      return this.service._create(body);
    }

    @Put(':id')
    crudUpdate(
      @Param('id', MongoIdValidation) id: string,
      @Body() body: Partial<Dto>,
    ) {
      return this.service._update(id, body);
    }

    @Delete(':id')
    crudRemove(@Param('id', MongoIdValidation) id: string) {
      return this.service._remove(id);
    }
  }

  const ControllerName = `${controllerName}Controller`;
  Object.defineProperty(CrudController, 'name', { value: ControllerName });

  return CrudController;
};

export { getCrudController };
