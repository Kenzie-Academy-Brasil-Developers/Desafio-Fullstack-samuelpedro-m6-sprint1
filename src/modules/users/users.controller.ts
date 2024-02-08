/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, UseGuards, Request, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { log } from 'node:console';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: any,
  ): Promise<User> {
    const tokenUserId = request.user.id;
    const updatedUser = await this.usersService.update(userId, updateUserDto, tokenUserId);
    return updatedUser;
  }

  @HttpCode(204)
  @Delete(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('userId') userId: string, @Req() request: any) {
    const tokenUserId = request.user.id;
    await this.usersService.remove(userId, tokenUserId);
  }
}
