import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.findOne({
      email,
    });

    return user;
  }
}
