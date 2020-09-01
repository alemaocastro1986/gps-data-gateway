import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/IUserService';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserServiceDto } from './dtos/UpdateUserServiceDto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async create({ name, password, email }: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      name,
      password,
      email,
    });

    await this.userRepository.save(user);

    return user;
  }

  async update({ id, ...rest }: UpdateUserServiceDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found!');
    }

    await this.userRepository.update(user.id, {
      ...rest,
    });

    await user.reload();

    return user;
  }
}
