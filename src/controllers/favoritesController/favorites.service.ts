import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const tracks = (
      await this.prismaService.favoriteTrack.findMany({
        include: { track: true },
      })
    ).map((v) => v?.track);

    const artists = (
      await this.prismaService.favoriteArtist.findMany({
        include: { artist: true },
      })
    ).map((v) => v?.artist);

    const albums = (
      await this.prismaService.favoriteAlbum.findMany({
        include: { album: true },
      })
    ).map((v) => v?.album);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(trackId: string) {
    const favoriteTrack = await this.isTrackIdInFavorites(trackId);
    if (!favoriteTrack) {
      return this.prismaService.favoriteTrack.create({ data: { trackId } });
    }
    return favoriteTrack;
  }

  async removeTrack(trackId: string) {
    await this.prismaService.favoriteTrack.delete({ where: { trackId } });
  }

  async checkTrackIdExists(id: string) {
    return this.prismaService.track.findUnique({ where: { id } });
  }

  async isTrackIdInFavorites(trackId: string) {
    return this.prismaService.favoriteTrack.findUnique({
      where: { trackId },
    });
  }

  async addAlbum(albumId: string) {
    const favoriteAlbum = await this.isAlbumIdInFavorites(albumId);
    if (!favoriteAlbum) {
      return this.prismaService.favoriteAlbum.create({ data: { albumId } });
    }
    return favoriteAlbum;
  }

  async removeAlbum(albumId: string) {
    await this.prismaService.favoriteAlbum.delete({ where: { albumId } });
  }

  async checkAlbumIdExists(id: string) {
    return this.prismaService.album.findUnique({ where: { id } });
  }

  async isAlbumIdInFavorites(albumId: string) {
    return this.prismaService.favoriteAlbum.findUnique({ where: { albumId } });
  }

  async addArtist(artistId: string) {
    const favoriteArtist = await this.isArtistIdInFavorites(artistId);
    if (!favoriteArtist) {
      return this.prismaService.favoriteArtist.create({ data: { artistId } });
    }
    return favoriteArtist;
  }

  async removeArtist(artistId: string) {
    await this.prismaService.favoriteArtist.delete({ where: { artistId } });
  }

  async checkArtistIdExists(id: string) {
    return this.prismaService.artist.findUnique({ where: { id } });
  }

  async isArtistIdInFavorites(artistId: string) {
    return this.prismaService.favoriteArtist.findUnique({
      where: { artistId },
    });
  }
}
