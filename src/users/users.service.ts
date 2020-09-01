import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/IUserService';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserServiceDto } from './dtos/UpdateUserServiceDto';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

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

  async auth(id: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    const isValid = await user.passwordCheck(password);

    return isValid;
  }
}
