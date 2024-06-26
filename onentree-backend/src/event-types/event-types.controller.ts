import { Controller, Get } from '@nestjs/common';
import { EventType } from '@prisma/client';
import { EventTypesService } from './event-types.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de eventos')
@Controller('event-types')
export class EventTypesController {

  constructor(
    private eventTypeService: EventTypesService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os tipos de eventos'})
  @ApiResponse({ status: 200, description: 'Todos os tipos foram retornados'})
  async findAll(): Promise<EventType[]> {
    return this.eventTypeService.findAll();
  }

}
