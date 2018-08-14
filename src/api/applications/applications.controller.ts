import { Controller, Get, UseGuards, Post, Inject, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {

    constructor(
        @Inject('ApplicationsService') private readonly service: ApplicationsService,
    ) {}

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Retunrs all definitions for respository', isArray: true})
    public findAll() {
        return this.service.findAll();
    }
}
