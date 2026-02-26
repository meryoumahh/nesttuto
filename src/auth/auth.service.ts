import { user } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';


type AuthInput = {username: string; password: string};
type SignInData = {userId: number; username: string};
type AuthResult = {accessToken: string; userId: number; username: string};


@Injectable()
export class AuthService {
    //to be able to inject other module's services in this module 
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {} 


    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.signIn(user);
    }




    async validateUser(input: AuthInput): Promise<SignInData | null> {
        //call the user's module's service to validate the user
        const user = await this.userService.findUserByName(input.username);
        //if user exists and the input password matches the user's password, return the user data (without password)
        if (user && user.password === input.password) {
            return {
                userId: user.userId,
                username: user.username,
            };
        }
        return null; 
    }

    async signIn (user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.userId,
            username: user.username,
        };
        //there are 2 sign function in jwt the async signAsync and the synchronous the sign we will use the async to not block the execution
        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return {
            accessToken,
            username: user.username,
            userId: user.userId,
        };
    }
}