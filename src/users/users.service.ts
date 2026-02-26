import { Injectable } from '@nestjs/common';

export type user = {
    userId : number;
    username : string;
    password : string;
}

//this is mock, add a DB
const users : user[] = [
    {
        userId : 1,
        username : 'john',
        password : 'changeme',
    },
    {
        userId : 2,
        username : 'chris',
        password : 'secret',
    },
];
@Injectable()
export class UsersService {
    async findUserByName(username : string) : Promise<user | undefined> {
        return users.find(user => user.username === username);
    }
}
