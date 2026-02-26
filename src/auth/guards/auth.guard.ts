import { CanActivate, ExecutionContext, Injectable, UnauthorizedException  } from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
    //injecting the JWT service
    constructor(private jwtService: JwtService) {}


    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const authorizartion = request.headers.authorization; // bearer token
        const token = authorizartion?.split(' ')[1]; //we want the second element which is expected to be the token
        if (!token) {
            throw new UnauthorizedException('No token provided'); //no token provided, deny access
        }
        try{
            const tokenPayload = await this.jwtService.verifyAsync(token); //verify the token, if it's invalid it will throw an error
            request.user = {
                userId: tokenPayload.sub,
                username: tokenPayload.username,
            }
            return true;
        }catch (error) { 
            throw new UnauthorizedException('Invalid token'); //invalid token, deny access   
        }
        return true
    }
}
