import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CacheService } from '../../cache/services/cache.service';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity';
import { UserCreateInput } from '../inputs/user-create.input';
import { UserUpdateInput } from '../inputs/user-update.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly cache: CacheService,
  ) {}

  async userDetails(id: string): Promise<UserDto | null> {
    const cachedValue: UserDto = await this.cache.get<UserDto>(id);
    if (cachedValue) {
      return cachedValue;
    }
    const resultEntity: UserEntity = await this.repository.findOne({ where: { id } });
    if (!resultEntity) {
      return null;
    }
    const dto: UserDto = this.mapEntityToDto(resultEntity);
    this.cache.set(id, dto);
    return dto;
  }

  async createUser(userInput: UserCreateInput): Promise<string | null> {
    const resultEntity: UserEntity = await this.repository.save(this.repository.create({ ...userInput }));
    if (!resultEntity) {
      return null;
    }
    this.cache.set(resultEntity.id, this.mapEntityToDto(resultEntity));
    return resultEntity.id;
  }

  async updateUser(id: string, userInput: UserUpdateInput): Promise<UserDto> {
    await this.repository.update(id, userInput);
    this.cache.remove(id);
    return this.userDetails(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.delete({ id });
    this.cache.remove(id);
  }

  async getList(): Promise<UserDto[]> {
    const data: UserEntity[] = await this.repository.find();
    return data.map((entity: UserEntity) => this.mapEntityToDto2(entity));
  }

  private mapEntityToDto2(entity: UserEntity): UserDto {
    const user: UserDto = new UserDto();
    user.phone = entity.phone;
    user.lastName = entity.lastName;
    user.id = entity.id;
    user.email = entity.email;
    user.login = entity.login;
    user.firstName = entity.firstName;

    return user;
  }

  private mapEntityToDto(entity: UserEntity): UserDto {
    return {
      phone: entity.phone,
      lastName: entity.lastName,
      id: entity.id,
      email: entity.email,
      login: entity.login,
      firstName: entity.firstName,
    };
  }
}
