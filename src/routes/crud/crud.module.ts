import { DynamicModule, Module } from '@nestjs/common';
import { CrudService, REPOSITORY_TOKEN } from './crud.service';
import { getCrudController } from './getCrudController';

type CrudModuleConfig<T> = {
  routeBase: string;
  repository: any;
  repositoryModule: any;
  DTO: any;
};

@Module({})
class CrudModule {
  static register<T>(config: CrudModuleConfig<T>): DynamicModule {
    const { repository, repositoryModule } = config;
    const Controller = getCrudController<T>(config);
    return {
      module: CrudModule,
      imports: [repositoryModule],
      providers: [
        {
          provide: REPOSITORY_TOKEN,
          useExisting: repository,
        },
        CrudService,
      ],
      controllers: [Controller],
    };
  }
}

export { CrudModuleConfig, CrudModule };
