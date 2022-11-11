import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  @Inject(CACHE_MANAGER)
  private readonly cache: Cache;

  async getHello() {
    await this.cache.set('TEST', 1234);
    const cached = await this.cache.get('SHIT');
    console.log({ cached });
    return 'Hello World!';
  }
}
