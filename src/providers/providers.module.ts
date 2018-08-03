import { Module } from '@nestjs/common';
import { Amazon, Config } from '.';

@Module({
  imports: [],
  controllers: [],
  providers: [Amazon, Config],
  exports: [Amazon, Config],
})
export class ProvidersModule {}
