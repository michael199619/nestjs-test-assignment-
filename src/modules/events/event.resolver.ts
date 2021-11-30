import { Int, Args, Parent, Query, Mutation, Resolver, ResolveField } from '@nestjs/graphql';
import { Event, EventInput } from './event.model';
import { EventService } from './event.service';

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
  ) { }

  @Query(() => [Event], { name: 'events' })
  async getEvents(
    @Args({ name: 'locations', type: () => [String], defaultValue: [] }) locations: string[] = [],
    @Args({ name: 'start', type: () => Date, defaultValue: null }) start: string,
    @Args({ name: 'end', type: () => Date, defaultValue: null }) end: string
  ) {
    return this.eventService.findAll({
      locations, start, end
    });
  }

  @Mutation(() => Boolean, { name: 'deleteEvent' })
  async deleteEvent(
    @Args({ name: 'id', type: () => Number }) id: number,
  ) {
    return this.eventService.deleteEventById(id);
  }

  @Mutation(() => Event, { name: 'events' })
  async createEvent(
    @Args('data') data: EventInput,
  ) {
    return this.eventService.createEvent(data);
  }

  @Mutation(() => Event, { name: 'joinEventToLocation' })
  async joinEventToLocation(
    @Args({ name: 'eventId', type: () => Number }) eventId: number,
    @Args({ name: 'locationId', type: () => Number }) locationId: number,
  ) {
    return this.eventService.joinEventToLocation(eventId, locationId);
  }

  @Mutation(() => Event, { name: 'removeEventFromLocation' })
  async removeEventFromLocation(
    @Args({ name: 'eventId', type: () => Number }) eventId: number,
    @Args({ name: 'locationId', type: () => Number }) locationId: number,
  ) {
    return this.eventService.removeEventFromLocation(eventId, locationId);
  }

  @Mutation(() => Event, { name: 'editEvent' })
  async editEvent(
    @Args({ name: 'id', type: () => Number }) id: number,
    @Args('data') data: EventInput,
  ) {
    return this.eventService.editEvent(id, data);
  }
}
