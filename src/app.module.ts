import { Module } from '@nestjs/common';
import { DeploysModule } from 'deploys/deploys.module';
import { ProvidersModule } from 'providers';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [DeploysModule, AuthModule, ProvidersModule],
  controllers: [],
})
export class AppModule {}
