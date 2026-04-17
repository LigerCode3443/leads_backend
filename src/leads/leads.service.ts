import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { CreateCommentDto } from 'src/comments/dto/creat-comment.dto';
import { ListLeadsQueryDto } from './dto/list-leads.query';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadStatus } from '../generated/prisma/client';


@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ListLeadsQueryDto) {

  
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const sort = query.sort ?? 'createdAt';
    const order = query.order ?? 'desc';

    const where: Prisma.LeadWhereInput = {};



    if (query.status) {
      where.status = query.status;
    } else {
      delete where.status; 
    }

    const q = (query.q || '').trim();
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.lead.findMany({
        where,
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.lead.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async get(id: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async create(dto: CreateLeadDto) {
    return await this.prisma.lead.create({
      data: {
        name: dto.name,
        email: dto.email ?? null,
        company: dto.company ?? null,
        status: dto.status ?? 'NEW',
        value: dto.value ?? null,
        notes: dto.notes ?? null,
      },
    });
  }

  async updateStatus(id: string, status: LeadStatus) {
    return await this.prisma.lead.update({
      where: { id },
      data: { status },
    });
  }

  async update(id: string, dto: UpdateLeadDto) {

    await this.get(id);

    return await this.prisma.lead.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.email !== undefined && { email: dto.email ?? null }),
        ...(dto.company !== undefined && { company: dto.company ?? null }),
        ...(dto.status !== undefined && { status: dto.status }),
        ...(dto.value !== undefined && { value: dto.value ?? null }),
        ...(dto.notes !== undefined && { notes: dto.notes ?? null }),
      },
    });
  }

  async remove(id: string) {
    await this.get(id);
    await this.prisma.lead.delete({ where: { id } });
  }

  
}