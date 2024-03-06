import { ModuleMetadata } from '@nestjs/common';

import { CacheService } from './cache.service';

export const services: ModuleMetadata['providers'] = [CacheService];
