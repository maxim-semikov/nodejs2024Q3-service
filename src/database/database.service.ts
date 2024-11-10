import { Injectable } from '@nestjs/common';
import { UserEntityService } from './entityServices/userEntityService';
import { ArtistEntityService } from './entityServices/artistEntityService';
import { AlbumEntityService } from './entityServices/albumEntityService';
import { TrackEntityService } from './entityServices/trackEntityService';

@Injectable()
export class DatabaseService {
  public user: UserEntityService = UserEntityService.createUserEntityService();

  public artist: ArtistEntityService =
    ArtistEntityService.createArtistEntityService();

  public album: AlbumEntityService =
    AlbumEntityService.createAlbumEntityService();

  public track: TrackEntityService =
    TrackEntityService.createTrackEntityService();
}
