import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FavoriteTypes } from '../../interface/interface';

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

  async checkEntityExists(id: string, favType: FavoriteTypes) {
    switch (favType) {
      case 'artist':
        return Boolean(
          await this.prismaService.artist.findUnique({
            where: { id },
          }),
        );

      case 'album':
        return Boolean(
          await this.prismaService.album.findUnique({ where: { id } }),
        );

      case 'track':
        return Boolean(
          await this.prismaService.track.findUnique({ where: { id } }),
        );

      default:
        return false;
    }
  }

  async isEntityInFavorites(id: string, favType: FavoriteTypes) {
    switch (favType) {
      case 'artist':
        return this.prismaService.favoriteArtist.findUnique({
          where: { artistId: id },
        });

      case 'album':
        return this.prismaService.favoriteAlbum.findUnique({
          where: { albumId: id },
        });

      case 'track':
        return this.prismaService.favoriteTrack.findUnique({
          where: { trackId: id },
        });

      default:
        return false;
    }
  }

  private async addToFavoriteByIdAndType(id: string, favType: FavoriteTypes) {
    switch (favType) {
      case 'artist':
        return this.prismaService.favoriteArtist.create({
          data: { artistId: id },
        });

      case 'album':
        return this.prismaService.favoriteAlbum.create({
          data: { albumId: id },
        });

      case 'track':
        return this.prismaService.favoriteTrack.create({
          data: { trackId: id },
        });

      default:
        return null;
    }
  }

  async addToFavorite(id: string, favType: FavoriteTypes) {
    const favoriteEntity = await this.isEntityInFavorites(id, favType);
    if (!favoriteEntity) {
      return this.addToFavoriteByIdAndType(id, favType);
    }
    return favoriteEntity;
  }

  async removeFromFavorite(id: string, favType: FavoriteTypes) {
    switch (favType) {
      case 'artist':
        await this.prismaService.favoriteArtist.delete({
          where: { artistId: id },
        });
        return;

      case 'album':
        await this.prismaService.favoriteAlbum.delete({
          where: { albumId: id },
        });
        return;

      case 'track':
        await this.prismaService.favoriteTrack.delete({
          where: { trackId: id },
        });
        return;
    }
  }
}
