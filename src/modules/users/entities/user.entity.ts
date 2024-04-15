import { BaseEntity } from 'src/common/entities/base.entity';
import { UserModel } from '../models/user.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('text')
  @ApiProperty()
  fullName: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty()
  email: string;

  @Column('text', {
    select: false,
  })
  @ApiProperty()
  password: string;
}
