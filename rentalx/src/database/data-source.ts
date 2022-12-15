import { DataSource } from 'typeorm';

const myDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'rentx',
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/modules/**/entities/**/*.ts'],
  logging: true,
  synchronize: true,
});

export { myDataSource };
