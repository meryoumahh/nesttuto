import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
/*export type user = {
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
];*/
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}
    async findUserByName(username : string) : Promise<User | null> {
        return this.usersRepository.findOneBy({username: username});
    }
}
