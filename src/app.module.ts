import { Module } from '@nestjs/common';
import { DeploysModule } from '@api/deploys/deploys.module';
import { ApplicationsModule } from '@api/applications/applications.module';
import { AuthModule } from 'auth/auth.module';
import { DeployersModule } from 'deployers/deployers.module';

@Module({
    imports: [
        DeploysModule,
        ApplicationsModule,
        DeployersModule
    ],
})
export class AppModule {}
