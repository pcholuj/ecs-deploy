import { ProvidersModule } from '@providers/providers.module';
import { DeployersService } from './deployers.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [ProvidersModule],
    providers: [DeployersService],
    exports: [DeployersService],
})
export class DeployersModule {}
