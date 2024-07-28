import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModule } from '../cache/cache.module';
import { controllers } from './controllers';
import { entities } from './entity';
import { services } from './services';

@Module({
  imports: [TypeOrmModule.forFeature(entities), CacheModule],
  controllers: [...controllers],
  providers: [...services],
  exports: [TypeOrmModule],
})
export class PostModule {}
