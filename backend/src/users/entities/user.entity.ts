import {
  Entity,
  Column,
  PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable,
} from 'typeorm';

import { BaseEntity } from '../../shared/entities';
import {Book} from "../../books/entities";

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  NOACTIVE: 'NOACTIVE'
};

export type UserStatus = keyof typeof USER_STATUS;

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'numeric', nullable: true
  })
  public age: number;

  @Column({
    type: 'varchar', nullable: true
  })
  public avatar: string;

  @ManyToMany(() => Book, book => book.users)
  @JoinTable()
  public history: Book[];

  @Column({
    type: 'varchar', enum: USER_STATUS, default: USER_STATUS.NOACTIVE, nullable: true
  })
  status: UserStatus;

  toJSON() {
    return {
      id: this.id,
      age: this.age || 0,
      history: this.history
    };
  }
}
