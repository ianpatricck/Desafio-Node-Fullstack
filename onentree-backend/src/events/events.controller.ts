import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dto/CreateEventDto';
import { UpdateEventDto } from './dto/UpdateEventDto';
import { ISelectEvent } from './interfaces/ISelectEvent';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Eventos")
@Controller('events')
export class EventsController {

  constructor(
    private eventsService: EventsService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os eventos'})
  @ApiResponse({ status: 200, description: 'Todos os eventos foram retornados'})
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get('/latest/:limit')
  @ApiOperation({ summary: 'Retorna os últimos eventos cadastrados dentro de um certo limite'})
  @ApiResponse({ status: 200, description: 'Todos os últimos eventos foram retornados nesse limite'})
  async findLatestByLimit(@Param('limit') limit: number): Promise<Event[]> {
    return this.eventsService.findLatestByLimit(limit);
  }

  @Get('/pagination/:skip/:limit')
  @ApiOperation({ summary: 'Retorna os eventos de acordo com uma paginação com o parâmetro de "skip" e um limite'})
  @ApiResponse({ status: 200, description: 'Todos os eventos dentro desse intervalo foram retornados'})
  async findByPagination(@Param('skip') skip: number, @Param('limit') limit: number): Promise<Event[]> {
    return this.eventsService.findByPagination(skip, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna o evento com o id especificado'})
  @ApiResponse({ status: 200, description: 'O evento foi retornado'})
  @ApiResponse({ status: 404, description: 'Evento não encontrado'})
  async findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Get('/select/all')
  @ApiOperation({ summary: 'Retorna todos os eventos selecionando apenas os campos passados na query'})
  @ApiResponse({ status: 200, description: 'Todos os eventos apenas com os campos passados foram retornados'})
  async findAllSelect(@Query() select: ISelectEvent): Promise<Event[]> {

    for (const [key, value] of Object.entries(select)) {
      select[key] = !!value;
    }

    return this.eventsService.findAllSelect(select);
  }
 
  @Post('/create')
  @ApiOperation({ summary: 'Cria um novo evento'})
  @ApiResponse({ status: 201, description: 'Um novo evento foi criado'})
  @ApiResponse({ status: 400, description: 'Já existe outro evento nesse local para esta data'})
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Atualiza um evento com o id passado como parâmetro'})
  @ApiResponse({ status: 201, description: 'O evento foi atualizado'})
  @ApiResponse({ status: 400, description: 'Não foi possível atualizar o evento'})
  @ApiResponse({ status: 404, description: 'evento não encontrado'})
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Apaga um evento com o id passado como parâmetro'})
  @ApiResponse({ status: 200, description: 'Evento apagado com sucesso'})
  @ApiResponse({ status: 404, description: 'Evento não encontrado'})
  async delete(@Param('id') id: string): Promise<Event> {
    return this.eventsService.delete(id);
  }

  @Get('/search/:name/:skip/:limit')
  @ApiOperation({ summary: 'Procura os eventos com o nome passado, faz uma paginação com o "skip" e limite'})
  @ApiResponse({ status: 200, description: 'Retornou todos os eventos que começam com o nome passado'})
  async searchByName(@Param('name') name: string, @Param('skip') skip: number, @Param('limit') limit: number): Promise<Event[]> {
    return this.eventsService.searchByName(name, skip, limit);
  }

}
