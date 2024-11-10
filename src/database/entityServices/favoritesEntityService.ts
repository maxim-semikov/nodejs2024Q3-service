import { Favorites } from '../../interface/interface';

export class FavoritesEntityService {
  private artists: Set<string>;
  private albums: Set<string>;
  private tracks: Set<string>;

  constructor() {
    this.artists = new Set();
    this.albums = new Set();
    this.tracks = new Set();
  }

  getAll(): Favorites {
    return {
      artists: Array.from(this.artists.values()) || [],
      albums: Array.from(this.albums.values()) || [],
      tracks: Array.from(this.tracks.values()) || [],
    };
  }

  addTrack(id: string) {
    this.tracks.add(id);
  }

  removeTrack(id: string) {
    this.tracks.delete(id);
  }

  hasTrackId(id: string) {
    return this.tracks.has(id);
  }

  addAlbum(id: string) {
    this.albums.add(id);
  }

  removeAlbum(id: string) {
    this.albums.delete(id);
  }

  hasAlbumId(id: string) {
    return this.albums.has(id);
  }

  addArtist(id: string) {
    this.artists.add(id);
  }

  removeArtist(id: string) {
    this.artists.delete(id);
  }

  hasArtistId(id: string) {
    return this.artists.has(id);
  }
}
