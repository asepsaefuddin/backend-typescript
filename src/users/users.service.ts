import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(email: string, password: string) {
    return this.userModel.create({ email, password });
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
}
