import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { PostEntity } from './post.entity';
import { Post3MEntity } from './post-3-m.entity';

export * from './post.entity';

export const entities: EntityClassOrSchema[] = [PostEntity, Post3MEntity];
