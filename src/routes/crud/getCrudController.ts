import { Controller, Get, Inject, Type } from '@nestjs/common';
import { ApiOkResponse, ApiTags, IntersectionType } from '@nestjs/swagger';
import { CrudModuleConfig } from './crud.module';
import { CrudService } from './crud.service';
import { plainToInstance } from 'class-transformer';
import { MongoSchema } from '@repository/helpers';

const getControllerParam = (route: string) => {
  const sanitizedRoute = route.split(' ').join('');
  const controllerName =
    sanitizedRoute.charAt(0).toUpperCase() + sanitizedRoute.slice(1);
  return {
    sanitizedRoute,
    controllerName,
  };
};

const getCrudController = <T>(config: CrudModuleConfig<T>): Type<any> => {
  const { routeBase, DTO } = config;
  class Dto extends DTO {}
  class DocumentDto extends IntersectionType(Dto, MongoSchema) {}
  const { sanitizedRoute, controllerName } = getControllerParam(routeBase);
  console.log(DocumentDto);

  @ApiTags(sanitizedRoute)
  @Controller(`${sanitizedRoute}/crud`)
  class CrudController {
    @Inject()
    service: CrudService<T>;

    @Get()
    @ApiOkResponse({
      type: DocumentDto,
      isArray: true,
      description: `${DTO.name}s list`,
    })
    async crud_get(): Promise<DocumentDto[]> {
      return plainToInstance(DocumentDto, await this.service.get());
    }
  }

  const ControllerName = `${controllerName}Controller`;
  Object.defineProperty(CrudController, 'name', { value: ControllerName });

  return CrudController;
};

export { getCrudController };
