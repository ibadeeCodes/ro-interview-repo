import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepostitory } from '../../../common/database/repositories/AbstractBase.repository';
import { SwapRequest } from '../entities/swap-request.entity';
import { Repository } from 'typeorm';

export class SwapRequestRepository extends BaseAbstractRepostitory<SwapRequest> {
  constructor(
    @InjectRepository(SwapRequest)
    private readonly swapRequestRepo: Repository<SwapRequest>,
  ) {
    super(swapRequestRepo);
  }
}
