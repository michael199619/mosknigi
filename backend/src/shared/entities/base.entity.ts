import {UpdateDateColumn, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public readonly createdAt: string;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: string;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz', select: false })
  public deletedAt: string;
}
