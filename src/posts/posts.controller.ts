import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtPayload } from '../auth/jwt.strategy';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body() body: CreatePostDto) {
    return this.postsService.create(body.title, body.content, req.user.userId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePostDto) {
    return this.postsService.update(id, body.title, body.content);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
