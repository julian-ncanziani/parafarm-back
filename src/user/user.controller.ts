import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOrCreateUserDto } from './dto/findOrCreate.dto';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}
  
  
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Post()
  async findOrCreate(@Body() data: {email: string, name: string, rol?: 'admin' | 'client'}) {
    return await this.userService.findOrCreate(data);
  }

}
