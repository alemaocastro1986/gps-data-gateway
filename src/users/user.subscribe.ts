import { UserEntity } from './user.entity';
import {
  EntitySubscriberInterface,
  InsertEvent,
  EventSubscriber,
  UpdateEvent,
  Entity,
} from 'typeorm';
import { hash } from 'bcryptjs';

@EventSubscriber()
export class UserSubscribe implements EntitySubscriberInterface<UserEntity> {
  listenTo(): any {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    if (event.entity.password) {
      event.entity.password = await hash(event.entity.password, 8);
    }
  }

  async beforeUpdate(event: InsertEvent<UserEntity>) {
    if (event.entity.password) {
      event.entity.password = await hash(event.entity.password, 8);
    }
  }
}
