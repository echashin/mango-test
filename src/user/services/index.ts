import { ModuleMetadata } from '@nestjs/common';

import { UserService } from './user.service';

export * from './user.service';

export const services: ModuleMetadata['providers'] = [UserService];
