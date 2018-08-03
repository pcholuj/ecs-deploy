
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Config, ProvidersModule } from 'providers';

@Module({
  imports: [Config, ProvidersModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}