import { Controller, Get, UseGuards, Post, Inject, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { DefinitionsService } from './definitions.service';

@Controller('definitions')
export class DefinitionsController {

    constructor(
        @Inject('DefinitionsService') private readonly service: DefinitionsService,
    ) {}

    @Get('/:name')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Retunrs all deploys', isArray: true})
    public getByName(
        @Param('name') name: string,
    ) {
        return this.service.getByName(name);
    }
}
