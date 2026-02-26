import { Body, Controller, HttpCode, HttpStatus, NotImplementedException, Post, Get, UseGuards, Request  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input: {username: string; password: string}) {
        return this.authService.authenticate(input);
    }
    //the /restrcited route is now protected with the AuthGuard we created it will check for the presence and validity of the JWT token in the request header before allowing access to this route
    @UseGuards(AuthGuard)
    @Get('restricted')
    //return the user data from the request object which is set by the AuthGuard after validating the token
    restricted(@Request() request) {
        return request.user;
    }
}
