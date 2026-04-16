import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateLeadDto } from './dto/create-lead.dto';
import { ListLeadsQueryDto } from './dto/list-leads.query';

import { LeadsService } from './leads.service';
import { CreateCommentDto } from 'src/comments/dto/creat-comment.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-status-lead.dto';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @ApiOkResponse({ description: 'Paginated list of leads' })
  async list(@Query() query: ListLeadsQueryDto) {
    return await this.leadsService.list(query);
  }

  @Post()
  @ApiOkResponse({ description: 'Lead created' })
  async create(@Body() dto: CreateLeadDto) {
    return await this.leadsService.create(dto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Lead details' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  async get(@Param('id') id: string) {
    return await this.leadsService.get(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Lead fields updated' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return await this.leadsService.update(id, dto);
  }

  @Put(':id/status')
  @ApiOkResponse({ description: 'Lead status updated' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  async updateStatus(
    @Param('id') id: string, 
    @Body() dto: UpdateLeadStatusDto
  ) {
    return await this.leadsService.updateStatus(id, dto.status);
  } 

  @Delete(':id')
  @ApiOkResponse({ description: 'Lead deleted' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  async remove(@Param('id') id: string) {
    await this.leadsService.remove(id);
    return { ok: true };
  }

  @Get(':id/comments')
  @ApiOkResponse({ description: 'List of comments' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  async listComments(@Param('id') id: string) {
    return await this.leadsService.listComments(id);
  }

  @Post(':id/comments')
  @ApiOkResponse({ description: 'Comment added' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  async addComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    return await this.leadsService.addComment(id, dto);
  }
}