/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email)
    console.log(user)
    if (!user) {
      throw new UnauthorizedException("Invalid email or password")
    }
    if (!await compare(loginDto.password, user.password)) {
      throw new UnauthorizedException("Invalid email or password")
    }
    return {
      token: this.jwtService.sign({ email: loginDto.email }, { subject: user.id, secret:process.env.SECRET_KEY })
    }
  }
}
