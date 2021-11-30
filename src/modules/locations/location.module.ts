import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.model';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Location ])
  ],
  providers: [ LocationService, LocationResolver ],
  exports: [ LocationService ]
})
export class LocationModule {
}
