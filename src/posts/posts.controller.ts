import { Controller, Post, Get, Body, UseGuards, Req, Param, Patch, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body) {
    return this.postsService.create(
      body.title,
      body.content,
      req.user.userId,
    );
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.postsService.update(id, body.title, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}