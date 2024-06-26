import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dto/CreateEventDto';
import { UpdateEventDto } from './dto/UpdateEventDto';
import { ISelectEvent } from './interfaces/ISelectEvent';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async findLatestByLimit(limit: number): Promise<Event[]> {
    return this.prisma.event.findMany({
      take: Number(limit),
      orderBy: {
        updated_at: 'desc'
      },
      include: {
        type: true,
        place: true
      }
    });
  }

  async findAllSelect(select?: ISelectEvent): Promise<Event[]> {

    if (Object.keys(select).length) {
      return this.prisma.event.findMany({ select: select });
    } else {
      return this.prisma.event.findMany();
    }

  } 

  async findByPagination(skip: number, limit: number): Promise<Event[]>{
    return this.prisma.event.findMany({
      skip: Number(skip),
      take: Number(limit),
      orderBy: {
        name: 'asc'
      },
      include: {
        type: true,
        place: true
      }
    }); 
  }

  async findOne(id: string): Promise<Event> {

    try {

      const event = await this.prisma.event.findFirstOrThrow({
        where: {
          id: id
        }
      });

      return event;

    } catch (error) {
      throw new NotFoundException('Evento não encontrado'); 
    }

  }

  async create(createEventDto: CreateEventDto): Promise<Event> {

    const { place_id, date }  = createEventDto;

    const alreadyExists = await this.prisma.event.findFirst({
      where: {
        date: date,
        place_id: place_id
      }
    });

    if (alreadyExists) {
      throw new BadRequestException('Já existe outro evento nesse local para esta data');
    }

    return this.prisma.event.create({ data: createEventDto });
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.prisma.event.findFirst({ where: { id }});

    if (!event) {
      throw new NotFoundException('Evento não encontrado'); 
    }

    return this.prisma.event.update({
      where: {
        id: id
      },

      data: updateEventDto
    });
  }

  async delete(id: string): Promise<Event> {
    const event = await this.prisma.event.findFirst({ where: { id }});

    if (!event) {
      throw new NotFoundException('Evento não encontrado'); 
    }
      
    return this.prisma.event.delete({ where: { id } });  
  }

  async searchByName(name: string, skip: number, limit: number): Promise<Event[]> {
    return await this.prisma.event.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive'
        }
      },
      include: {
        place: true,
        type: true
      },
      skip: Number(skip),
      take: limit.toString() == 'undefined' ? undefined : Number(limit)
    });
  } 

}
