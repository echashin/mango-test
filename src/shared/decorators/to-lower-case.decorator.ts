import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export const ToLowerCase: any = () => {
  return applyDecorators(Transform(({ value }: TransformFnParams) => (value ? value.toLowerCase() : value)));
};
