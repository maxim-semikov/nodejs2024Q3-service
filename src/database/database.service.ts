import { Injectable } from '@nestjs/common';
import { UserEntityService } from './entityServices/userEntityService';
import { ArtistEntityService } from './entityServices/artistEntityService';
import { AlbumEntityService } from './entityServices/albumEntityService';

@Injectable()
export class DatabaseService {
  public user: UserEntityService = UserEntityService.createUserEntityService();

  public artist: ArtistEntityService =
    ArtistEntityService.createArtistEntityService();

  public album: AlbumEntityService =
    AlbumEntityService.createAlbumEntityService();
}
