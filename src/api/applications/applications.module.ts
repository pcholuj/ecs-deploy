import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  controllers: [ApplicationsController],
  imports: [ProvidersModule],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
