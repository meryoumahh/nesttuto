import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from './users/entities/users.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}), // Load .env file and make it available globally
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DATABASE_PORT!) ,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User],
      database: process.env.DB_NAME,
      synchronize: true,//in prod it should be false and use migrations instead to avoid data loss
      logging: true,
    }),
    UsersModule, 
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
