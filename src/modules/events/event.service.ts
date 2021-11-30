import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

import { Event, EventInput } from './event.model';
import { Location } from '../locations/location.model';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async findAll({locations, start, end}: {locations: string[], start: string, end: string}) {
    const events = this.entityManager.createQueryBuilder(Event, 'event')
      .leftJoinAndSelect('event.locations', 'location')
      .leftJoinAndSelect('event.user', 'user');

    if (locations.length) {
      events.where("location.name IN (:...locations)", {
        locations
      })
    }

    if (start) {
      events.andWhere("event.start >= :start", {
        start: new Date(start)
      })
    }

    if (end) {
      events.andWhere("event.end <= :end", {
        end: new Date(end)
      })
    }

    return await events.getMany();
  }

  async createEvent(data: EventInput) {
    const event = await this.eventRepository.save(
      this.eventRepository.create(data)
    );

    return event;
  }

  async editEvent(id: number, data: EventInput) {
    const event = await this.eventRepository.findOne(id);

    if (!event) {
      throw new NotFoundException('there is no event');
    }

    await this.eventRepository.save({...event, ...data});
    return event;
  }

  async joinEventToLocation(eventId: number, locationId: number) {
    const [event, location] = await Promise.all([
      this.eventRepository.findOne(eventId, {relations: ['locations']}),
      this.locationRepository.findOne(locationId)
    ]);

    if (!event) {
      throw new NotFoundException('there is no event');
    }

    if (event.locations.find(({id}) => id === locationId)) {
      throw new BadRequestException('location is exists')
    }

    if (!location) {
      throw new NotFoundException('there is no location');
    }

    event.locations.push(location);
    await this.eventRepository.save(event);
    return event;
  }

  async removeEventFromLocation(eventId: number, locationId: number) {
    const event = await this.eventRepository.findOne(eventId, {relations: ['locations']});

    if (!event) {
      throw new NotFoundException('there is no event');
    }

    event.locations = event.locations.filter(({id}) => id !== locationId);
    await this.eventRepository.save(event);
    return event;
  }

  async deleteEventById(id: number) {
    const is = await this.eventRepository.delete(id);
    return !!is.affected
  }
}
