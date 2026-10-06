import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'shows', schema: 'dbo' })
export class ShowsEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  synopsis!: string;

  @Column({ nullable: true, name: 'original_title' })
  originalTitle!: string;

  @Column()
  tagline!: string;
}
