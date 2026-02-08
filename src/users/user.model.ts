import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Post } from '../posts/post.model';

@Table
export class User extends Model<User> {
  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @HasMany(() => Post)
  posts: Post[];
}
