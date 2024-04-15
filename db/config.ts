import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  synchronize: false,
  // logging: true,
};

export const dataSourceOptions = {
  ...dbConfig,
  entities: ['dist/src/modules/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  location: 'dist/db/migrations',
  migrationsRun: true,
  cli: {
    migrationsDir: __dirname + 'db/migrations',
  },
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
