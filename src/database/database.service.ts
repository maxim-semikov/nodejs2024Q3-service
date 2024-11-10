import { Injectable } from '@nestjs/common';
import { UserEntityService } from './entityServices/userEntityService';
import { ArtistEntityService } from './entityServices/artistEntityService';

@Injectable()
export class DatabaseService {
  public user: UserEntityService = UserEntityService.createUserEntityService();
  public artist: ArtistEntityService =
    ArtistEntityService.createArtistEntityService();
}
