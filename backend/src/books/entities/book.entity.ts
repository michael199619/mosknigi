import {
  Entity,
  Column,
  PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne,
} from 'typeorm';

import { BaseEntity } from '../../shared/entities';
import {User} from "../../users/entities";

export const BOOK_STATUS = {
  ADD: 'ADD',
  OLDER: 'OLDER'
};

export type BookStatus = keyof typeof BOOK_STATUS;

@Entity('book')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar', nullable: true
  })
  public author: string;

  @ManyToMany(() => User, user => user.history, {onDelete: "CASCADE"})
  public users: User[];


  @Column({
    type: 'varchar', nullable: true
  })
  public title: string;

  @Column({
    type: 'varchar', nullable: true
  })
  public about: string;

  @Column({
    type: 'varchar', nullable: true
  })
  public lang: string;

  @Column({
    type: 'varchar', nullable: true
  })
  public theme: string;

  @Column({
    type: 'varchar', nullable: true
  })
  public url: string;

  @Column({
    type: 'numeric', nullable: true
  })
  public release_year: number;

  @Column({
    type: 'varchar', nullable: true
  })
  public age: string;

  @Column({
    type: 'varchar', enum: BOOK_STATUS, nullable: true
  })
  status: BookStatus;

  favorite: boolean;
  range: number;

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      author: this.author,
      age: this.age,
      lang: this.lang,
      theme: this.theme,
      release_year: this.release_year,
      about: this.about,
      favorite: this.favorite,
      range: this.range
    };
  }
}
