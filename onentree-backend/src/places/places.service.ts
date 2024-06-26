import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Place } from '@prisma/client';
import { UpdatePlaceDto } from './dto/UpdatePlaceDto';
import { CreatePlaceDto } from './dto/CreatePlaceDto';
import { ISelectPlace } from './interfaces/ISelectPlace';

@Injectable()
export class PlacesService {
  constructor(
    private prisma: PrismaService
  ) {}

  async findAll(): Promise<Place[]> {
    return this.prisma.place.findMany();
  }

  async findLatestByLimit(limit: number): Promise<Place[]> {
    return this.prisma.place.findMany({
      take: Number(limit),
      orderBy: {
        updated_at: 'desc'
      },
    });
  }

  async findAllSelect(select?: ISelectPlace): Promise<Place[]> {

    if (Object.keys(select).length) {
      return this.prisma.place.findMany({ select: select });
    } else {
      return this.prisma.place.findMany();
    }

  }

  async findByPagination(skip: number, limit: number): Promise<Place[]>{
    return this.prisma.place.findMany({
      skip: Number(skip),
      take: Number(limit),
      orderBy: {
        name: 'asc'
      }
    }); 
  }

  async findOne(id: string): Promise<Place> {

    try {

      return await this.prisma.place.findFirstOrThrow({
        where: {
          id: id
        },
      });

    } catch (error) {

      throw new NotFoundException("Local não encontrado"); 
    }

  }

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.prisma.place.create({
      data: createPlaceDto
    });
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const place = await this.prisma.place.findFirst({ where: { id }});

    if (!place) {
      throw new NotFoundException('Local não encontrado');
    }

    return this.prisma.place.update({
      where: {
        id: id
      },

      data: updatePlaceDto
    });
  }

  async delete(id: string): Promise<Place> {

    const place = await this.prisma.place.findFirst({ where: { id }});

    if (!place) {
      throw new NotFoundException("Local não encontrado"); 
    }

    const isInEvent = await this.prisma.event.findFirst({ where: { place_id: id }});

    if (isInEvent) {
      throw new BadRequestException("Há eventos existentes para esse local");
    }

    return this.prisma.place.delete({ where: { id } });
  }

  async searchByName(name: string, skip: number, limit: number): Promise<Place[]> {
    return await this.prisma.place.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive'
        }
      },
      include: {
        type: true
      },
      skip: Number(skip),
      take: limit.toString() == 'undefined' ? undefined : Number(limit)
    });
  } 


}
