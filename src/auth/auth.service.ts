import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.usersService.create(email, hashed);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException();

    return {
      access_token: this.jwtService.sign({
        userId: user.id,
        email: user.email,
      }),
    };
  }
}
