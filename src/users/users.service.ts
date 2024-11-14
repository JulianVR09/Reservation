import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericService } from 'src/common/services/generic.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){
    super(userRepository)
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto)
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findByUserId(id: string): Promise<User>  {
    return super.FindById(id)
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return super.update(id, updateUserDto)
  }

  async deleteUser(id: string): Promise<User> {
    return super.delete(id)
  }
}
