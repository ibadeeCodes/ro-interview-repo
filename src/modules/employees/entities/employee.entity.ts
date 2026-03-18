import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Shift } from './shift.entity';
import { UserEntity } from '../../users/entity/user.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.employee)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => Shift, (shift: Shift) => shift.employee)
  shifts: Shift[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
