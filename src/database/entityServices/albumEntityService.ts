import { Album } from '../../interface/interface';
import { EntityService } from './EntityService';

export class AlbumEntityService extends EntityService<Album> {
  constructor() {
    super();
  }

  clearArtistId(id: string) {
    this.getAll().forEach((album) => {
      if (album.artistId == id) {
        album.artistId = null;
        this.update(album.id, album);
      }
    });
  }
}
