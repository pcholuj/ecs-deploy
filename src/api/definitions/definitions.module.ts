import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { DefinitionsController } from './definitions.controller';
import { DefinitionsService } from './definitions.service';

@Module({
  controllers: [DefinitionsController],
  imports: [ProvidersModule],
  providers: [DefinitionsService],
  exports: [DefinitionsService],
})
export class DefinitionsModule {}
