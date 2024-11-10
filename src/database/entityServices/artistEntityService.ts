import { Artist } from '../../interface/interface';
import { EntityService } from './EntityService';

export class ArtistEntityService extends EntityService<Artist> {
  constructor() {
    super();
  }
}
