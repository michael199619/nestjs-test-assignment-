import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { User, UserInput } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll() {
    return this.userRepository.find;
  }

  findById(id: number) {
    return this.userRepository.findOne({ id });
  }

  async createUser( data: UserInput ) {
    const user = await this.userRepository.save(
      this.userRepository.create(data)
    );

    return user;
  }

  findByIds(ids: number[]) {
    return this.userRepository.find({
      where: { id: In(ids) },
    });
  }
}
