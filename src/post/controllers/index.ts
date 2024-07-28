import { ModuleMetadata } from '@nestjs/common';

import { PostController } from './post.controller';

export const controllers: ModuleMetadata['controllers'] = [PostController];
