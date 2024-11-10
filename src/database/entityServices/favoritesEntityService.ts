import { Favorites } from '../../interface/interface';
import { FavoriteSet } from './favoriteSet';

export class FavoritesEntityService {
  artists: FavoriteSet;
  albums: FavoriteSet;
  tracks: FavoriteSet;

  constructor() {
    this.artists = new FavoriteSet();
    this.albums = new FavoriteSet();
    this.tracks = new FavoriteSet();
  }

  getAll(): Favorites {
    return {
      artists: this.artists.getAll(),
      albums: this.albums.getAll(),
      tracks: this.tracks.getAll(),
    };
  }
}
