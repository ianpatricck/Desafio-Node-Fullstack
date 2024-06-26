import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PlacesModule } from './places/places.module';
import { PlaceTypesModule } from './place-types/place-types.module';
import { EventTypesModule } from './event-types/event-types.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './not-found-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env']
    }),
    PrismaModule,
    EventsModule, 
    PlacesModule, 
    PlaceTypesModule, 
    EventTypesModule, 
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter
    }
  ]
})
export class AppModule {}
