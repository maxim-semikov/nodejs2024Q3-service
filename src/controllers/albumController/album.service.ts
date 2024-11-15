import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.album.findMany();
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return this.prismaService.album.create({ data: createAlbumDto });
  }

  async findOne(id: string) {
    const album = await this.prismaService.album.findUnique({
      where: { id: id },
    });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async update(id: string, updateArtistDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    const data = { ...album, ...updateArtistDto };

    return this.prismaService.album.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prismaService.album.delete({ where: { id } });
    await this.prismaService.favoriteAlbum.deleteMany({
      where: { albumId: id },
    });
  }
}
