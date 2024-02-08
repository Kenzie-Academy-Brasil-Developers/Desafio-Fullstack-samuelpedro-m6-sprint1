/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Contact } from './entities/contact.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

async create(CreateContactDto: CreateContactDto, userId: string) {
  const contact = Object.assign(new Contact(), CreateContactDto)
    const newContact = await this.prisma.contact.create({
      data: {
        id: contact.id,
        fullName: contact.fullName,
        email: contact.email,
        telephone: contact.telephone,
        userId,
        createdAt: contact.createdAt,
      }
    })
    return newContact
}

  async findAll() {
    return await this.prisma.contact.findMany();
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findFirst({ where: { id } });
    if (!contact) {
      throw new NotFoundException("Contact not found");
    }
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
  
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      throw new NotFoundException("Contact does not exist");
    }
  
    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: { ...updateContactDto },
    });
  
    return plainToInstance(Contact, updatedContact); // Retorna o contato atualizado
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      throw new NotFoundException("Contact does not exist");
    }

    await this.prisma.contact.delete({ where: { id } });
  }
}