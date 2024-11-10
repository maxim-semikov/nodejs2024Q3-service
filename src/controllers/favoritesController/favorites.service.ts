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
    this.databaseService.favorites.addTrack(id);
    return this.databaseService.track.get(id);
  }

  removeTrack(id: string) {
    this.databaseService.favorites.removeTrack(id);
  }

  checkTrackIdExists(trackId: string) {
    return this.databaseService.track.has(trackId);
  }

  isTrackIdInFavorites(trackId: string) {
    return this.databaseService.favorites.hasTrackId(trackId);
  }

  addAlbum(id: string) {
    this.databaseService.favorites.addAlbum(id);
    return this.databaseService.album.get(id);
  }

  removeAlbum(id: string) {
    this.databaseService.favorites.removeAlbum(id);
  }

  checkAlbumIdExists(id: string) {
    return this.databaseService.album.has(id);
  }

  isAlbumIdInFavorites(id: string) {
    return this.databaseService.favorites.hasAlbumId(id);
  }

  addArtist(id: string) {
    this.databaseService.favorites.addArtist(id);
    return this.databaseService.artist.get(id);
  }

  removeArtist(id: string) {
    this.databaseService.favorites.removeArtist(id);
  }

  checkArtistIdExists(id: string) {
    return this.databaseService.artist.has(id);
  }

  isArtistIdInFavorites(id: string) {
    return this.databaseService.favorites.hasArtistId(id);
  }
}
