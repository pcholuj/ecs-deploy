
import * as jwt from 'jsonwebtoken';
import { Injectable, Inject } from '@nestjs/common';
import { Config } from 'providers';

export interface JwtPayload {
    email: string;
}

@Injectable()
export class AuthService {
    constructor(
        @Inject('Config') private readonly config: Config,
    ) { }

    async createToken() {
        // console.log(arguments);
        const user: JwtPayload = { email: 'user@email.com' };
        return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
    }

    async validateUser(payload: JwtPayload): Promise<any> {

        // return await this.usersService.findOneByEmail(payload.email);
    }
}