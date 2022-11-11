import { Module } from '@nestjs/common';
import { cacheConfig } from './cache.config';

@Module({
  imports: [cacheConfig],
})
export class ConfigModule {}
