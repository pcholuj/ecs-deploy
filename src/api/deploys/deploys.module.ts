import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { DeploysController } from './deploys.controller';
import { DeploysService } from './deploys.service';

@Module({
  controllers: [DeploysController],
  imports: [ProvidersModule],
  providers: [DeploysService],
  exports: [DeploysService],
})
export class DeploysModule {}
