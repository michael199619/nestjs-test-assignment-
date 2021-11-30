import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany, ManyToOne, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { User } from '../users/user.model';
import { Location } from '../locations/location.model';

@Entity('events')
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @ManyToMany(() => Location, e => e.events)
  @JoinTable()
  @Field(() => [ Location ], { nullable: true })
  locations: Location[];

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User, { nullable: true })
  user: User;

  @Column({unsigned: true, type: 'int'})
  userId: number;

  @Column()
  @Field({ nullable: false })
  description: string;

  @Column({type: 'date', nullable: true})
  @Field(() => String, { nullable: true })
  start: Date;

  @Column({type: 'date', nullable: true})
  @Field(() => String, { nullable: true })
  end: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class EventInput {
  @Column()
  @Field({ nullable: false })
  name: string;

  @Column()
  @Field({ nullable: false })
  description: string;

  @Column()
  @Field(() => String, { nullable: false })
  start: Date;

  @Column()
  @Field(() => String, { nullable: false })
  end: Date;
}