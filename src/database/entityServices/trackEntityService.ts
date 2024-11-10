import { Track } from '../../interface/interface';
import { EntityService } from './EntityService';

export class TrackEntityService extends EntityService<Track> {
  constructor() {
    super();
  }

  clearArtistId(id: string) {
    this.getAll().forEach((track) => {
      if (track.artistId == id) {
        track.artistId = null;
        this.update(track.id, track);
      }
    });
  }

  clearAlbumId(id: string) {
    this.getAll().forEach((track) => {
      if (track.albumId == id) {
        track.albumId = null;
        this.update(track.id, track);
      }
    });
  }
}
