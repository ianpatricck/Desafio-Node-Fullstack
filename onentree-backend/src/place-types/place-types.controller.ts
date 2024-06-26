import { Controller, Get } from '@nestjs/common';
import { PlaceTypesService } from './place-types.service';
import { PlaceType } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de lugares')
@Controller('place-types')
export class PlaceTypesController {

  constructor(
    private placeTypeService: PlaceTypesService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os tipos de locais'})
  @ApiResponse({ status: 200, description: 'Todos os tipos foram retornados'})
  async findAll(): Promise<PlaceType[]> {
    return this.placeTypeService.findAll();
  }

}
