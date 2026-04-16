import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { LeadsService } from 'src/leads/leads.service';

@Injectable()
export class CommentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly leadsService: LeadsService) {}


    async listComments(leadId: string) {
        await this.leadsService.get(leadId);
        return await this.prisma.comment.findMany({
          where: { leadId },
          orderBy: { createdAt: 'desc' },
        });
      }
    
    async addComment(leadId: string, dto: CreateCommentDto) {
        await this.leadsService.get(leadId);
        return await this.prisma.comment.create({
          data: {
            leadId,
            text: dto.text,
          },
        });
    }
}
