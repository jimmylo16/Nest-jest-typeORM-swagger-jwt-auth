import { PartialType, OmitType } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(RegisterUserDto, ['password'] as const),
) {
  deletedAt?: Date;
}
