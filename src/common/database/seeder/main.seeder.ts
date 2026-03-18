import { ROLE } from '../../constants';
import { UserEntity } from '../../../modules/users/entity/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {

        const userRepo = dataSource.getRepository(UserEntity);

        console.log('seeding users...');
        const users = userRepo.create([
            {
                name: 'Admin',
                email: 'admin@example.com',
                password: '$2b$12$eI0eTUcd2lGytAjRxNmYkuLyzLUz34pGv9yI1jq7ifm3BQAK0QnoS',
                role: ROLE.SUPER_ADMIN
            }
        ]);
        await userRepo.save(users);
    }
}