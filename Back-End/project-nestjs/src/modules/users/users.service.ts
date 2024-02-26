import { ConflictException, Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email }
    })

    if (foundUser) {
      throw new ConflictException("Email already exists")
    }

    const user = new User()
    Object.assign(user, createUserDto)
    await this.prisma.user.create({ data: { ...user } })
    return plainToInstance(User, user)
  }

  async findAll() {
    const users = await this.prisma.user.findMany()
    return plainToInstance(User, users)
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException("User does not exists")
    }
    return plainToInstance(User, user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto, tokenUserId: string): Promise<User> {
    await this.checkPermission(id, tokenUserId);

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });

    return plainToInstance(User, updatedUser);
  }

  async remove(id: string, tokenUserId: string) {
    await this.checkPermission(id, tokenUserId);

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    await this.prisma.user.delete({ where: { id } });
  }

  async checkPermission(userId: string, tokenUserId: string) {
    if (userId !== tokenUserId) {
      throw new UnauthorizedException("Only the user himself has access to this route!");
    }
  }
}