import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  create(title: string, content: string, userId: number) {
    return this.postModel.create({
      title,
      content,
      userId,
    });
  }

  findAll() {
    return this.postModel.findAll();
  }
}
