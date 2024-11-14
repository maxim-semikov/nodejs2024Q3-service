import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.album.findMany();
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async update(id: string, updateArtistDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    const data = { ...album, ...updateArtistDto };

    return this.prisma.album.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.album.delete({ where: { id: id } });
  }
}
