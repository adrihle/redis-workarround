import { Module } from '@nestjs/common';
import { RoutesModule } from '@routes';
import { Interceptors } from '@providers';
import { ConfigModule } from '@config';

const { GlobalInterceptorsModule } = Interceptors;

@Module({
  imports: [RoutesModule, GlobalInterceptorsModule, ConfigModule],
})
export class AppModule {}
