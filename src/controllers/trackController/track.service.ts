import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.track.findMany();
  }

  async create(createTrackDto: CreateTrackDto) {
    return this.prismaService.track.create({ data: createTrackDto });
  }

  async findOne(id: string) {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    const data = { ...track, ...updateTrackDto };

    return this.prismaService.track.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prismaService.track.delete({ where: { id } });
  }
}
