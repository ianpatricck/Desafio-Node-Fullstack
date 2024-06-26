import { Injectable } from '@nestjs/common';
import { PlaceType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlaceTypesService {

  constructor(
    private prisma: PrismaService
  ) {}

  async findAll(): Promise<PlaceType[]> {
    return this.prisma.placeType.findMany();
  }

}
