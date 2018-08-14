import { Controller, Get, UseGuards, Post, Inject, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { RepositoryService } from './repository.service';

@Controller('repository')
export class RespoitoryController {

    constructor(
        @Inject('RepositoryService') private readonly service: RepositoryService,
    ) {}

    @Get('/:name')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Retunrs all definitions for respository', isArray: true})
    public getByName(
        @Param('name') name: string,
    ) {
        return this.service.getRepositoryList(name);
    }
}
