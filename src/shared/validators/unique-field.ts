import { registerDecorator, ValidationOptions } from 'class-validator';

import { UniqueRule } from './classes/unique-rule';

export function UniqueField(entity: Function, field?: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    if (!field) {
      field = propertyName;
    }
    registerDecorator({
      name: 'UniqueRule',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueRule,
      constraints: [entity, field],
      async: true,
    });
  };
}
