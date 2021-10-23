import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../shared/entities';

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

  @Column({
    type: 'varchar', nullable: true
  })
  public book_img_url: string;

  @Column({
    type: 'varchar', nullable: true
  })
  public title: string;

  @Column({
    type: 'varchar', nullable: true
  })
  public about: string;

  @Column({
    type: 'numeric', nullable: true
  })
  public release_year: number;

  @Column({
    type: 'varchar', enum: BOOK_STATUS, nullable: true
  })
  status: BookStatus;

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      author: this.author,
      release_year: this.release_year,
      about: this.about,
      book_img_url: this.book_img_url,
    };
  }
}
