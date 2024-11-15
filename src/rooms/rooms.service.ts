import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GenericService } from 'src/common/services/generic.service';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService extends GenericService<Room>{
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room> 
  ){
    super(roomRepository);
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    return super.create(createRoomDto);
  }

  async findAllRooms(): Promise<Room[]> {
    return super.findAll();
  }

  async findByRoomId(id: string): Promise<Room> {
    return super.FindById(id);
  }

  async updateRoom(id: string, updateRoomDto: UpdateRoomDto) {
    const entity = await this.roomRepository.findOne({where: {id}})
    
    if(!entity) throw new NotFoundException(`Room with id ${id} does not exist`)

    if(entity.available === false) {
      throw new NotFoundException(`Room with id ${id} is not available`)
    }

    entity.available = false;

    await this.roomRepository.save({...entity, ...updateRoomDto});

    if(!entity.available) {
      setTimeout(async () => {
        entity.available = true;
        await this.roomRepository.save(entity);
        console.log(`Room with id ${entity.id} is now available again`); 
      }, 5 * 60 * 1000)
    }

    return { message: `Room with id ${id} was assigned successfully`}
  }

  async removeRoom(id: string) {
    return super.delete(id);
  }
}
