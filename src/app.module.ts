import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import {AppConfigModule} from './config/config.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {ConnectionOptions} from 'typeorm';
import {SeedService} from './db/seed.service';
import { EventModule } from './modules/events/event.module';
import { LocationModule } from './modules/locations/location.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get<ConnectionOptions>('db'),
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true, playground: true}),
    LocationModule,
    UserModule,
    EventModule
  ],
  controllers: [],
  providers: [SeedService],
  exports: [SeedService]
})
export class AppModule {
}
