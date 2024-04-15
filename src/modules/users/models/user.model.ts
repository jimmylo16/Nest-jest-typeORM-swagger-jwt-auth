import { BaseModel } from 'src/common/models/base.model';

export class UserModel extends BaseModel {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
}
