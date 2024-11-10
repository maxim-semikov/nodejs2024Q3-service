import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from '../../database/database.service';
import { createUUID } from '../../helpers/uuidHelpers';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.artist.getAll();
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: createUUID(),
      ...createArtistDto,
    };
    this.databaseService.artist.create(newArtist);
    return newArtist;
  }

  findOne(id: string) {
    const artist = this.databaseService.artist.get(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    const newArtist = { ...artist, ...updateArtistDto };

    this.databaseService.artist.update(id, newArtist);
    return newArtist;
  }

  remove(id: string) {
    this.findOne(id);
    this.databaseService.artist.delete(id);

    this.databaseService.track.clearArtistId(id);
    this.databaseService.album.clearArtistId(id);
    this.databaseService.favorites.removeArtist(id);
  }
}
