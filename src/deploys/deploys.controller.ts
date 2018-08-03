import { Controller, Get, UseGuards, Post, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { DeploysService } from './deploys.service';

@Controller('deploys')
export class DeploysController {

    constructor(
        @Inject('DeploysService') private readonly service: DeploysService,
    ) {}

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Retunrs all deploys', isArray: true})
    public findAll() {
        return {};
    }

    @Get('/tasks/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Retunrs all deploys', isArray: true})
    public tasksDefinition() {
        return {};
    }

    @Get('/status/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Retunrs all deploys', isArray: true})
    public status() {
        return {};
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Retunrs all deploys', isArray: true})
    public schedule() {
        return {};
    }
}
