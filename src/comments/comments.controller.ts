import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/creat-comment.dto';


@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}

  @Get('/:id')
  @ApiOkResponse({ description: 'List of comments' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  async listComments(@Param('id') id: string) {
    return await this.commentsService.listComments(id);
  }

  @Post('create/:id')
  @ApiOkResponse({ description: 'Comment added' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  async addComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    return await this.commentsService.addComment(id, dto);
  }
}
