import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { UserEntity } from './user.entity';

export * from './user.entity';

export const entities: EntityClassOrSchema[] = [UserEntity];
