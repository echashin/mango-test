import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'post' })
export class PostEntity {
  @ApiProperty({ type: String, readOnly: true, required: true })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ type: Date, required: false })
  @CreateDateColumn()
  @Index()
  createDate?: Date;

  @ApiProperty({ type: Date, required: false })
  @UpdateDateColumn({ name: 'update_date' })
  updateDate?: Date;

  @ApiProperty({ type: String, required: false })
  @Column({ type: 'text' })
  text?: string;
}
