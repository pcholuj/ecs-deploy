import { ApplicationsModule } from '@api/applications/applications.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { DeploysController } from './deploys.controller';
import { DeploysService } from './deploys.service';
import { DeploysProvider } from '@api/deploys/deploys.provider';
import { DeployersModule } from 'deployers/deployers.module';

@Module({
  controllers: [DeploysController],
  imports: [ProvidersModule, ApplicationsModule, DeployersModule],
  providers: [DeploysService, DeploysProvider],
  exports: [DeploysService],
})
export class DeploysModule {}
