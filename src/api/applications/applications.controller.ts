import { Controller, Get, UseGuards, Post, Inject, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {

    constructor(
        @Inject('ApplicationsService') private readonly service: ApplicationsService,
    ) {}

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Retunrs all configured applications', isArray: true})
    public findAll() {
        return this.service.findAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiImplicitParam({ name: 'id', type: 'number', description: 'applicationId'})
    @ApiResponse({ status: 200, description: 'Retunrs application by id', isArray: true})
    public findOne(
        @Param('id') id: number,
    ) {
        return this.service.findById(id);
    }

    @Get('/:id/versions')
    @UseGuards(AuthGuard('jwt'))
    @ApiImplicitParam({ name: 'id', type: 'number', description: 'applicationId'})
    @ApiResponse({ status: 200, description: 'Returns all version for application', isArray: true})
    public findOneVersions(
        @Param('id') id: number,
    ) {
        return this.service.findVersionsById(id);
    }

    @Post('/:id/:tag')
    @UseGuards(AuthGuard('jwt'))
    @ApiImplicitParam({ name: 'id', type: 'number', description: 'applicationId'})
    @ApiImplicitParam({ name: 'tag', type: 'string', description: 'tag to deploy'})
    @ApiResponse({ status: 200, description: 'Runs deploy and returns status', isArray: true})
    public deploy(
        @Param('id') id: number,
        @Param('tag') tag: string,
    ) {
        return this.service.deploy(id, tag);
    }

    @Get('/:id/deploys')
    @UseGuards(AuthGuard('jwt'))
    @ApiImplicitParam({ name: 'id', type: 'number', description: 'applicationId'})
    @ApiResponse({ status: 200, description: 'Returns deployment statys', isArray: true})
    public status(
        @Param('id') id: number,
    ) {
        return this.service.status(id);
    }
}
