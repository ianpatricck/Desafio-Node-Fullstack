import { Module } from '@nestjs/common';
import { PlaceTypesService } from './place-types.service';
import { PlaceTypesController } from './place-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PlaceTypesService],
  controllers: [PlaceTypesController]
})
export class PlaceTypesModule {}
