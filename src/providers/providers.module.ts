import { Module } from '@nestjs/common';
import { AmazonEcs, Config } from '.';
import { DatabaseProvider } from '@providers/database.provider';

@Module({
  providers: [AmazonEcs, Config, ...DatabaseProvider],
  exports: [AmazonEcs, Config, ...DatabaseProvider],
})
export class ProvidersModule {}
