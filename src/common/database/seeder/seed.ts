import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './main.seeder';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { NODE_ENV } from '../../constants';

dotenv.config();

const configService = new ConfigService();

const isDevelopment = configService.get<string>('NODE_ENV') === NODE_ENV.DEVELOPMENT;
const isQA = configService.get<string>('NODE_ENV') === NODE_ENV.QA;
const isProduction = configService.get<string>('NODE_ENV') === NODE_ENV.PRODUCTION;

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [`${__dirname}/../../../**/*.entity{.ts,.js}`],
  synchronize: false,
  logging: true,
  migrations: [`${__dirname}/../../../db/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  seeds: [MainSeeder],
  ...(isProduction ? {} : isQA ? { ssl: { rejectUnauthorized: true } } : {})
};

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  await runSeeders(datasource);
  process.exit();
}).catch((error) => {
  console.error('Error during seeding:', error);
  process.exit(1);
});