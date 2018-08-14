import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { RespoitoryController } from './repository.controller';
import { RepositoryService } from './repository.service';

@Module({
  controllers: [RespoitoryController],
  imports: [ProvidersModule],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
