
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './auth.service';
import { Config } from 'providers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private readonly config: Config,
      private readonly authService: AuthService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: JwtPayload, done) {
      console.info(payload, 'aaaaa');
      done(null, { test: 1 });
    // const user = await this.authService.validateUser(payload);
    // if (!user) {
    //   return done(new UnauthorizedException(), false);
    // }
    // done(null, user);
  }
}