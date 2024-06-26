import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePlaceDto } from './dto/CreatePlaceDto';
import { UpdatePlaceDto } from './dto/UpdatePlaceDto';
import { Place } from '@prisma/client';
import { PlacesService } from './places.service';
import { ISelectPlace } from './interfaces/ISelectPlace';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Locais')
@Controller('places')
export class PlacesController {

  constructor(
    private placesService: PlacesService
  ) {}
 
  @Get()
  @ApiOperation({ summary: 'Retorna todos os locais'})
  @ApiResponse({ status: 200, description: 'Todos os locais foram retornados'})
  async findAll(): Promise<Place[]> {
    return this.placesService.findAll();
  }

  @Get('/latest/:limit')
  @ApiOperation({ summary: 'Retorna os últimos locais cadastrados dentro de um certo limite'})
  @ApiResponse({ status: 200, description: 'Todos os últimos locais foram retornados nesse limite'})
  async findLatestByLimit(@Param('limit') limit: number): Promise<Place[]> {
    return this.placesService.findLatestByLimit(limit);
  }

  @Get('/pagination/:skip/:limit')
  @ApiOperation({ summary: 'Retorna os locais de acordo com uma paginação com o parâmetro de "skip" e um limite'})
  @ApiResponse({ status: 200, description: 'Todos os locais dentro desse intervalo foram retornados'})
  async findByPagination(@Param('skip') skip: number, @Param('limit') limit: number): Promise<Place[]> {
    return this.placesService.findByPagination(skip, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna o local com o id especificado'})
  @ApiResponse({ status: 200, description: 'O local foi retornado'})
  @ApiResponse({ status: 404, description: 'Local não encontrado'})
  async findOne(@Param('id') id: string): Promise<Place> {
    return this.placesService.findOne(id);
  }

  @Get('/select/all')
  @ApiOperation({ summary: 'Retorna todos os locais selecionando apenas os campos passados na query'})
  @ApiResponse({ status: 200, description: 'Todos os locais apenas com os campos passados foram retornados'})
  async findAllSelect(@Query() select: ISelectPlace): Promise<Place[]> {

    for (const [key, value] of Object.entries(select)) {
      select[key] = !!value;
    }

    return this.placesService.findAllSelect(select);
  }

  @Post('/create')
  @ApiOperation({ summary: 'Cria um novo local'})
  @ApiResponse({ status: 201, description: 'Um novo local foi criado'})
  @ApiResponse({ status: 400, description: 'Não foi possível criar o local'})
  async create(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placesService.create(createPlaceDto);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Atualiza um local com o id passado como parâmetro'})
  @ApiResponse({ status: 201, description: 'O local foi atualizado'})
  @ApiResponse({ status: 400, description: 'Não foi possível atualizar o local'})
  @ApiResponse({ status: 404, description: 'Local não encontrado'})
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Apaga um local com o id passado como parâmetro'})
  @ApiResponse({ status: 200, description: 'Local apagado com sucesso'})
  @ApiResponse({ status: 400, description: 'Há eventos existentes para esse local'})
  @ApiResponse({ status: 404, description: 'Local não encontrado'})
  delete(@Param('id') id: string) {
    return this.placesService.delete(id);
  }

  @ApiOperation({ summary: 'Procura os locais com o nome passado, faz uma paginação com o "skip" e limite'})
  @ApiResponse({ status: 200, description: 'Retornou todos os locais que começam com o nome passado'})
  @Get('/search/:name/:skip/:limit')
  async searchByName(@Param('name') name: string, @Param('skip') skip: number, @Param('limit') limit: number): Promise<Place[]> {
    return this.placesService.searchByName(name, skip, limit);
  }

}
