import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: string) {
    return this.userRepository.find({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    const users = await this.userRepository.find({
      where: { deletedAt: null },
      take: limit,
      skip: offset,
    });

    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto, userId: string) {
    if (userId != id) {
      throw new ForbiddenException(
        'You are not allowed to remove another user',
      );
    }
    await this.findOne(id);

    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: string, userId: string) {
    if (userId != id) {
      throw new ForbiddenException(
        'You are not allowed to remove another user',
      );
    }
    const deletedUser = await this.update(
      id,
      { deletedAt: new Date() },
      userId,
    );

    return deletedUser;
  }
}
