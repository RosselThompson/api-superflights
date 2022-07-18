import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get the list of all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  update(@Param('id') id: string, @Body() userDTO: UserDTO) {
    return this.userService.update(id, userDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
