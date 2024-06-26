import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventType } from '@prisma/client';

@Injectable()
export class EventTypesService {

  constructor(
    private prisma: PrismaService
  ) {}

  async findAll(): Promise<EventType[]> {
    return this.prisma.eventType.findMany();
  }

}
