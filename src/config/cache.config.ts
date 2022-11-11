import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

const cacheConfig = CacheModule.register({
  isGlobal: true,
  store: redisStore,
  socket: {
    host: 'localhost',
    port: 6379,
  },
  ttl: 10,
});

export { cacheConfig };
