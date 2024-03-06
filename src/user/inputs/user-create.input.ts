import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsEmail, IsString } from 'class-validator';

import { UniqueField } from '../../shared/validators/unique-field';
import { UserEntity } from '../entity';

@Exclude()
export class UserCreateInput {
  @ApiProperty({ type: String, required: true, description: 'User first name' })
  @IsDefined()
  @IsString()
  @Expose()
  firstName!: string;

  @ApiProperty({ type: String, required: true, description: 'User last name' })
  @IsDefined()
  @IsString()
  @Expose()
  lastName!: string;

  @ApiProperty({ type: String, required: true, description: 'User login' })
  @IsDefined()
  @IsString()
  @Expose()
  login!: string;

  @ApiProperty({ type: String, required: true, description: 'User email' })
  @IsDefined()
  @UniqueField(UserEntity)
  @IsEmail()
  @Expose()
  email!: string;

  @ApiProperty({
    required: true,
    description: 'User phone',
    type: String,
  })
  @IsString()
  @IsDefined()
  @Expose()
  phone!: string;
}
