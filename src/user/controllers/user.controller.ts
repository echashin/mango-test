import { Body, Controller, Get, HttpException, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { UserDto } from '../dto/user.dto';
import { IdParamInput } from '../inputs/id-param.input';
import { UserCreateInput } from '../inputs/user-create.input';
import { UserUpdateInput } from '../inputs/user-update.input';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: String })
  async createUser(@Body() input: UserCreateInput): Promise<String> {
    const userId: string = await this.userService.createUser(input);
    if (userId) {
      return userId;
    } else {
      throw new HttpException('Cannot create user, try again later', 503);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get list of users' })
  @ApiOkResponse({ type: [UserDto] })
  async userList(): Promise<UserDto[]> {
    return this.userService.getList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details' })
  @ApiOkResponse({ type: Boolean })
  async details(@Param() params: IdParamInput): Promise<UserDto> {
    const user: UserDto = await this.userService.userDetails(params.id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException(`User with id = ${params.id} not found`);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiCreatedResponse({ type: UserDto })
  async update(@Body() input: UserUpdateInput, @Param() params: IdParamInput): Promise<UserDto> {
    return this.userService.updateUser(params.id, input);
  }
}
