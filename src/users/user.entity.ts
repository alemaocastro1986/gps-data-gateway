import { Exclude } from 'class-transformer';
import { Entity, Column } from 'typeorm';
import { EntityBase } from 'src/shared/database/entities/EntityBase';
import { compare } from 'bcryptjs';

@Entity('users')
export class UserEntity extends EntityBase {
  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  async passwordCheck(password: string): Promise<boolean> {
    const isValid = await compare(password, this.password);
    return isValid;
  }
}
