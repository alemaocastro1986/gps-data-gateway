import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserEntity } from '../user.entity';
import { UpdateUserDto } from '../dtos/UpdateUserDto';

export interface IUserService {
  create(data: CreateUserDto): Promise<UserEntity>;
  update(data: UpdateUserDto): Promise<UserEntity>;
}
