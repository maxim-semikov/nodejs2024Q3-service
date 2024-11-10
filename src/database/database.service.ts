import { Injectable } from '@nestjs/common';
import { UserEntityService } from './entityServices/userEntityService';
import { ArtistEntityService } from './entityServices/artistEntityService';
import { AlbumEntityService } from './entityServices/albumEntityService';
import { TrackEntityService } from './entityServices/trackEntityService';
import { FavoritesEntityService } from './entityServices/favoritesEntityService';

@Injectable()
export class DatabaseService {
  public user = new UserEntityService();

  public artist = new ArtistEntityService();

  public album = new AlbumEntityService();

  public track = new TrackEntityService();

  public favorites = new FavoritesEntityService();
}
