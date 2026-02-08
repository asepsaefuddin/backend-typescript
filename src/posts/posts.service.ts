import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { User } from '../users/user.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}

  create(title: string, content: string, userId: number) {
    return this.postModel.create({ title, content, userId });
  }

  findAll() {
    return this.postModel.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
  }

  findOne(id: number) {
    return this.postModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
  }

  async update(id: number, title?: string, content?: string) {
    await this.postModel.update({ title, content }, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.postModel.destroy({ where: { id } });
    return { message: `Berhasil di hapus post dengan id ${id}` };
  }
}
