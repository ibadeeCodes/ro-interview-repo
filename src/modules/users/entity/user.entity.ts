import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, OneToOne } from 'typeorm';
import { IsEmail } from "class-validator"
import { ROLE } from '../../../common/constants';
import { Employee } from '../../employees/entities/employee.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    @IsEmail()
    @Index({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: ROLE
    })
    role: ROLE;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Employee, (employee) => employee.user)
    employee: Employee;
}