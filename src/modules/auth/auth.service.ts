import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private configService: ConfigService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { password, ...userData } = registerUserDto;

    const userExists = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (userExists) throw new BadRequestException('User already exists');

    try {
      const user = this.userRepository.create({
        ...userData,
        password: await this.hashData(password),
      });

      await this.userRepository.save(user);
      delete user.password;

      const tokens = await this.getJwtToken({ id: user.id });

      return {
        ...user,
        token: tokens.accessToken,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;

    const tokens = await this.getJwtToken({ id: user.id });

    return {
      ...user,
      token: tokens.accessToken,
    };
  }

  private async getJwtToken(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(
      {
        payload,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );

    return { accessToken };
  }

  async hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Please check server logs');
  }
}
