import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post as PostModel } from './post.model';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [SequelizeModule.forFeature([PostModel])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}