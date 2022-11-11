import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [RoutesModule, InterceptorsModule, ConfigModule],
})
export class AppModule {}
