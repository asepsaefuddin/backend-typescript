import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { Post } from './posts/post.model';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_api_db',
      models: [User, Post],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
