import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from '../../database/database.service';
import { createUUID } from '../../helpers/uuidHelpers';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.album.getAll();
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: createUUID(),
      ...createAlbumDto,
    };
    this.databaseService.album.create(newAlbum);
    return newAlbum;
  }

  findOne(id: string) {
    const album = this.databaseService.album.get(id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  update(id: string, updateArtistDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    const newAlbum = { ...album, ...updateArtistDto };

    this.databaseService.album.update(id, newAlbum);
    return newAlbum;
  }

  remove(id: string) {
    this.findOne(id);
    this.databaseService.album.delete(id);
  }
}
