import { Jwt, Secret } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/configs/jwt-secret';
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  //import the user module we already prepared it in the user module (exported there)
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret:JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    })
  ],
})
export class AuthModule {}
