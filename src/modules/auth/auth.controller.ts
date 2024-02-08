/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
