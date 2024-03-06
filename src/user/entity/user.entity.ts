import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @ApiProperty({ type: String, readOnly: true, required: true })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ type: Date, required: false })
  @CreateDateColumn()
  createDate?: Date;

  @ApiProperty({ type: Date, required: false })
  @UpdateDateColumn({ name: 'update_date' })
  updateDate?: Date;

  @ApiProperty({ type: String, required: false })
  @Column({ type: 'varchar', length: 32 })
  firstName?: string;

  @ApiProperty({ type: String, required: false })
  @Column({ type: 'varchar', length: 32 })
  lastName?: string;

  @ApiProperty({ type: String, required: false })
  @Column({ type: 'varchar', length: 32 })
  login?: string;

  @ApiProperty({ type: String, required: false })
  @Column({ type: 'varchar', length: 300, unique: true })
  email?: string;

  @ApiProperty({ required: false, type: String })
  @Column({ type: 'varchar', nullable: false, length: 100 })
  phone?: string;
}
