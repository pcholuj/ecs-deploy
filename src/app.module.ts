import { Module } from '@nestjs/common';
import { DeploysModule } from '@api/deploys/deploys.module';
import { RepositoryModule } from '@api/repository/repository.module';
import { DefinitionsModule } from '@api/definitions/definitions.module';
import { ApplicationsModule } from '@api/applications/applications.module';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [DeploysModule, ApplicationsModule, DefinitionsModule, RepositoryModule],
})
export class AppModule {}
