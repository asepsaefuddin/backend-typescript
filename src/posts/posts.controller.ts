import { Controller, Post as HttpPost, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  create(@Body() body, @Req() req) {
    return this.postsService.create(
      body.title,
      body.content,
      req.user.id,
    );
  }
}
