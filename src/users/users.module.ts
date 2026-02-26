import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], //export it for future use in other modules' serivces 
})
export class UsersModule {}
