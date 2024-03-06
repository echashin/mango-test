import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString, IsUUID } from 'class-validator';

@Exclude()
export class UserDto {
  @ApiProperty({ type: String, readOnly: true, required: true, description: 'User id' })
  @IsUUID()
  @IsDefined()
  @Expose()
  id!: string;

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
  @IsString()
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
