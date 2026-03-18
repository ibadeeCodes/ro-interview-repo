import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepostitory } from '../../../common/database/repositories/AbstractBase.repository';
import { Employee } from '../entities/employee.entity';
import { Repository } from 'typeorm';

export class EmployeeRepository extends BaseAbstractRepostitory<Employee> {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {
    super(employeeRepo);
  }
}
