import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.artist.findMany();
  }

  async create(createArtistDto: CreateArtistDto) {
    return this.prismaService.artist.create({ data: createArtistDto });
  }

  async findOne(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id: id },
    });
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    const data = { ...artist, ...updateArtistDto };

    return this.prismaService.artist.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prismaService.favoriteArtist.deleteMany({
      where: { artistId: id },
    });
    await this.prismaService.artist.delete({ where: { id: id } });
  }
}
