import { ModuleMetadata } from '@nestjs/common';

import { PostService } from './post.service';
import { TemplateService } from './template.service';

export * from './post.service';

export const services: ModuleMetadata['providers'] = [PostService, TemplateService];
