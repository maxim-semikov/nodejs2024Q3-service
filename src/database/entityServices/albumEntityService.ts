import { Album } from '../../interface/interface';
import { EntityService } from './EntityService';

export class AlbumEntityService extends EntityService<Album> {
  constructor() {
    super();
  }
}
