import { DynamicModule, Module, Type } from '@nestjs/common';
import { CrudService, REPOSITORY_TOKEN } from './crud.service';
import { getCrudController } from './getCrudController';
import { RepositoryModule } from '@repository/repository.module';
import { RepositoryService } from '@repository/helpers';

type CrudModuleConfig<T> = {
  routeBase: string;
  repository: Type<RepositoryService<T>>;
  repositoryModule: Type<RepositoryModule>;
  DTO: { new () };
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
