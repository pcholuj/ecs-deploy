import { Module } from '@nestjs/common';
import { AmazonEcs, Config } from '.';

@Module({
  providers: [AmazonEcs, Config],
  exports: [AmazonEcs, Config],
})
export class ProvidersModule {}
