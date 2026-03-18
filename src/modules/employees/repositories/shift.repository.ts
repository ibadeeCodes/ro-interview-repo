import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepostitory } from '../../../common/database/repositories/AbstractBase.repository';
import { Shift } from '../entities/shift.entity';
import { Repository } from 'typeorm';

export class ShiftRepository extends BaseAbstractRepostitory<Shift> {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepo: Repository<Shift>,
  ) {
    super(shiftRepo);
  }
}
