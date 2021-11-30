import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Location, LocationInput } from './location.model';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ) {}

  findAll() {
    return this.locationRepository.find();
  }

  async createLocation(data: LocationInput) {
    const location = await this.locationRepository.save(
      this.locationRepository.create(data)
    );

    return location;
  }

  async editLocation(id: number, data: LocationInput) {
    const location = await this.locationRepository.findOne(id);

    if (!location) {
      throw new NotFoundException('there it no location');
    }

    await this.locationRepository.save({...location, ...data});
    return location;
  }

  async deleteLocationById(id: number) {
    const is = await this.locationRepository.delete(id);
    return !!is.affected
  }
}
