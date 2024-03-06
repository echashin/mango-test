import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { UniqueField } from '../../shared/validators/unique-field';
import { UserEntity } from '../entity';

@Exclude()
export class UserUpdateInput {
  @ApiProperty({ type: String, required: false, description: 'User first name' })
  @IsOptional()
  @IsString()
  @Expose()
  firstName?: string;

  @ApiProperty({ type: String, required: false, description: 'User last name' })
  @IsOptional()
  @IsString()
  @Expose()
  lastName?: string;

  @ApiProperty({ type: String, required: false, description: 'User login' })
  @IsOptional()
  @IsString()
  @Expose()
  login?: string;

  @ApiProperty({ type: String, required: false, description: 'User email' })
  @IsOptional()
  @UniqueField(UserEntity)
  @IsEmail()
  @Expose()
  email?: string;

  @ApiProperty({
    required: false,
    description: 'User phone',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Expose()
  phone?: string;
}
