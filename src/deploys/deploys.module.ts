import { Module } from '@nestjs/common';
import { DeploysController } from './deploys.controller';
import { DeploysService } from './deploys.service';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [DeploysController],
  imports: [DeploysService, AuthModule],
  exports: [DeploysService],
})
export class DeploysModule {}
