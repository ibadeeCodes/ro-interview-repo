import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { Shift } from './shift.entity';
import { SwapRequestStatus } from '../../../common/constants';

@Entity('swap_requests')
export class SwapRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  proposingEmployeeId: number;

  @ManyToOne(() => Employee)
  proposingEmployee: Employee;

  @Column()
  proposingShiftId: number;

  @ManyToOne(() => Shift)
  proposingShift: Shift;

  @Column()
  targetEmployeeId: number;

  @ManyToOne(() => Employee)
  targetEmployee: Employee;

  @Column()
  targetShiftId: number;

  @ManyToOne(() => Shift)
  targetShift: Shift;

  @Column({
    type: 'enum',
    enum: SwapRequestStatus,
    default: SwapRequestStatus.PENDING_RECIPIENT,
  })
  status: SwapRequestStatus;

  @Column({ nullable: true })
  managerId: number;

  @ManyToOne(() => Employee)
  manager: Employee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
