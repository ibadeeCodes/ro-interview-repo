import { UserEntity } from "../entity/user.entity";
import { IAbstractBaseRepository } from "src/common/database/repositories/IAbstractBase.interface";


export interface IUserRepository extends IAbstractBaseRepository<UserEntity> {}