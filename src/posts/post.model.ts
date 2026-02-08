import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { User } from '../users/user.model';

@Table({ tableName: 'posts' })
export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column(DataType.TEXT)
  declare content: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: CreationOptional<User>;
}