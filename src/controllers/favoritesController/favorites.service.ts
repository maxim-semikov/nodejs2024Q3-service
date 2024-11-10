import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private databaseService: DatabaseService) {}

  findAll() {
    const favorites = this.databaseService.favorites.getAll();
    const artists = favorites.artists.map((artistId) =>
      this.databaseService.artist.get(artistId),
    );

    const albums = favorites.albums.map((albumId) =>
      this.databaseService.album.get(albumId),
    );

    const tracks = favorites.tracks.map((trackId) =>
      this.databaseService.track.get(trackId),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string) {
    this.databaseService.favorites.tracks.add(id);
    return this.databaseService.track.get(id);
  }

  removeTrack(id: string) {
    this.databaseService.favorites.tracks.delete(id);
  }

  checkTrackIdExists(trackId: string) {
    return this.databaseService.track.has(trackId);
  }

  isTrackIdInFavorites(trackId: string) {
    return this.databaseService.favorites.tracks.has(trackId);
  }

  addAlbum(id: string) {
    this.databaseService.favorites.albums.add(id);
    return this.databaseService.album.get(id);
  }

  removeAlbum(id: string) {
    this.databaseService.favorites.albums.delete(id);
  }

  checkAlbumIdExists(id: string) {
    return this.databaseService.album.has(id);
  }

  isAlbumIdInFavorites(id: string) {
    return this.databaseService.favorites.albums.has(id);
  }

  addArtist(id: string) {
    this.databaseService.favorites.artists.add(id);
    return this.databaseService.artist.get(id);
  }

  removeArtist(id: string) {
    this.databaseService.favorites.artists.delete(id);
  }

  checkArtistIdExists(id: string) {
    return this.databaseService.artist.has(id);
  }

  isArtistIdInFavorites(id: string) {
    return this.databaseService.favorites.artists.has(id);
  }
}
