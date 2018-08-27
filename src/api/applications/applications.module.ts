import { DeployersModule } from 'deployers/deployers.module';
import { ApplicationProvider } from './applications.provider';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  controllers: [ApplicationsController],
  imports: [ProvidersModule, DeployersModule],
  providers: [ApplicationsService, ApplicationProvider],
  exports: [ApplicationsService, ApplicationProvider],
})
export class ApplicationsModule {}
