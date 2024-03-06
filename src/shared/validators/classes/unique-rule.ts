import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EntityManager, EntityTarget, Not, SelectQueryBuilder } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@ValidatorConstraint({ name: 'UniqueRule', async: true })
@Injectable()
export class UniqueRule implements ValidatorConstraintInterface {
  constructor(@InjectEntityManager() private em: EntityManager) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    if (!value) {
      return false;
    }

    const entity: EntityTarget<ObjectLiteral> = args.constraints[0];
    const field: string = args.constraints[1];

    const builder: SelectQueryBuilder<ObjectLiteral> = this.em
      .getRepository(entity)
      .createQueryBuilder()
      .select(['id'])
      .where({ [field]: value });

    if (args.object['id']) {
      const id: string = args.object['id'];
      builder.andWhere({ id: Not(id) });
    }

    const row: { id: string } | undefined = await builder.getRawOne();
    return !row;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} = ${args.value} already exists. Choose another.`;
  }
}
