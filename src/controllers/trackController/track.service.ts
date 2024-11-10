import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../../database/database.service';
import { createUUID } from '../../helpers/uuidHelpers';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.track.getAll();
  }

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: createUUID(),
      ...createTrackDto,
    };
    this.databaseService.track.create(newTrack);
    return newTrack;
  }

  findOne(id: string) {
    const track = this.databaseService.track.get(id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    const newTrack = { ...track, ...updateTrackDto };

    this.databaseService.track.update(id, newTrack);
    return newTrack;
  }

  remove(id: string) {
    this.findOne(id);

    this.databaseService.track.delete(id);
    this.databaseService.favorites.tracks.delete(id);
  }
}
