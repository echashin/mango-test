import { ModuleMetadata } from '@nestjs/common';

import { UserController } from './user.controller';

export const controllers: ModuleMetadata['controllers'] = [UserController];
