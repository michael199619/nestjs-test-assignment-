import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.model';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { Location } from '../locations/location.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Event, Location ])
  ],
  providers: [ EventService, EventResolver ],
  exports: [ EventService ]
})
export class EventModule {
}
