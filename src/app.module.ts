import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RoutesModule } from './routes/routes.module';
import { InterceptorsModule } from './interceptors/interceptors.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
    RoutesModule,
    InterceptorsModule,
  ],
})
export class AppModule {}
