import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async create(email: string, password: string) {
    const existing = await this.userModel.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashed = await bcrypt.hash(password, 10);
    await this.userModel.create({ email, password: hashed });

    return {
      message: 'User berhasil dibuat',
      email,
    };
  }

  findAll() {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async update(id: number, email?: string, password?: string) {
    const updateData: { email?: string; password?: string } = {};

    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const [affected] = await this.userModel.update(updateData, { where: { id } });
    if (affected === 0) {
      throw new NotFoundException('User tidak ditemukan');
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleted = await this.userModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException('User tidak ditemukan');
    }

    return {
      message: 'User berhasil dihapus',
      deletedId: id,
    };
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
}
