import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Post extends Model<Post> {
  @Column
  title: string;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
