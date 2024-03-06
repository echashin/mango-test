import { Module } from '@nestjs/common';

import { services } from './services';
import { CacheService } from './services/cache.service';

@Module({
  providers: [...services],
  exports: [CacheService],
})
export class CacheModule {}
