import { DynamicModule, Module, Type } from '@nestjs/common';
import { RepositoryService, RepositoryModule } from '@repository';
import { CrudService } from './crud.service';
import { getCrudController } from './getCrudController';
import { ClassConstructor } from 'class-transformer';

export type CrudModuleConfig<T> = {
  routeBase: string;
  repository: any;
  repositoryModule: any;
  DTO: any;
};

@Module({})
export class CrudModule {
  static register<T>(config: CrudModuleConfig<T>): DynamicModule {
    const { repository, repositoryModule } = config;
    const Controller = getCrudController<T>(config);
    return {
      module: CrudModule,
      imports: [repositoryModule],
      providers: [
        {
          provide: 'REPOSITORY',
          useExisting: repository,
        },
        CrudService,
      ],
      controllers: [Controller],
    };
  }
}
