import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly db : PrismaService) {}
  async create(createPlayerDto: CreatePlayerDto) {
    return await this.db.player.create({
      data: createPlayerDto
    });
  }

  findAll() {
    return this.db.player.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.db.player.findUnique({where: {id}});
    } catch (error) {
      return new NotFoundException;
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      return await this.db.player.update({
        where: {id},
        data: updatePlayerDto
      });
    } catch (err) {
      return new NotFoundException;
    }
  }

  remove(id: number) {
    return this.db.player.delete({where: {id}});
  }


}
