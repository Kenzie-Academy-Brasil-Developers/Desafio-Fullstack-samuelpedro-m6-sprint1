/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request, HttpCode } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsService } from './contacts.service'
import { Contact } from './entities/contact.entity';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() CreateContactDto: CreateContactDto, @Request() req) {
    return this.contactsService.create(CreateContactDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':contactId')
  findOne(@Param('contactId') id: string) {
    return this.contactsService.findOne(id);
  }

  @Patch(':contactId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
async update(
  @Param('contactId') contactId: string,
  @Body() updateContactDto: UpdateContactDto,
  @Req() request: any,
): Promise<Contact> {
  const updatedContact = await this.contactsService.update(contactId, updateContactDto);
  return updatedContact;
}

@HttpCode(204)
@Delete(':contactId')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
async remove(@Param('contactId') contactId: string, @Req() request: any) {
  await this.contactsService.remove(contactId);
}
}
