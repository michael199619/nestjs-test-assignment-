import {Injectable} from '@nestjs/common';
import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {ConfigService} from "@nestjs/config";
import { Location } from '../modules/locations/location.model';
import { Event } from '../modules/events/event.model';
import { User } from '../modules/users/user.model';

@Injectable()
export class SeedService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
        private serviceConfig: ConfigService
    ) {
    }

    async onModuleInit() {
        console.log('[Seed started]');

        if (await this.entityManager.findOne(User)) {
            console.log('[Seed end]');
            return
        }

        const user = await this.entityManager.save(User, {
            firstName: 'josh',
            lastName: 'ban'
        }) as User;

        const location = await this.entityManager.save(Location, {
            name: 'russia'
        });

        await this.entityManager.save(Event, {
            name: 'covid',
            locations: [location],
            description: 'idk',
            userId: user.id,
            start: new Date(),
            end: new Date()
        });

        console.log('[Seed end]');
    }
}
