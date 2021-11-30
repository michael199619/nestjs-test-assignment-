import { Int, Args, Parent, Query, Mutation, Resolver, ResolveField } from '@nestjs/graphql';
import { Location, LocationInput } from './location.model';
import { LocationService } from './location.service';

@Resolver(() => Location)
export class LocationResolver {
  constructor(
    private readonly locationService: LocationService,
  ) { }

  @Query(() => [Location], { name: 'locations' })
  async getLocations() {
    return this.locationService.findAll();
  }

  @Mutation(() => Boolean, { name: 'deleteLocation' })
  async deleteLocation(
    @Args({ name: 'id', type: () => Number }) id: number,
  ) {
    return this.locationService.deleteLocationById(id);
  }

  @Mutation(() => Location, { name: 'locations' })
  async createLocation(
    @Args('data') data: LocationInput,
  ) {
    return this.locationService.createLocation(data);
  }

  @Mutation(() => Location, { name: 'editLocations' })
  async editLocation(
    @Args({ name: 'id', type: () => Number }) id: number,
    @Args('data') data: LocationInput,
  ) {
    return this.locationService.editLocation(id, data);
  }
}
