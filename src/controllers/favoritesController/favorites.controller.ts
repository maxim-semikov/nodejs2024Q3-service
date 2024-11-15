import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', ValidateUuidPipe) id: string) {
    const isTrackIdExist = await this.favoritesService.checkTrackIdExists(id);
    if (!isTrackIdExist) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ValidateUuidPipe) id: string) {
    const isTrackIdInFavorites = this.favoritesService.isTrackIdInFavorites(id);
    if (!isTrackIdInFavorites) {
      throw new NotFoundException('Track is not favorite');
    }
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id', ValidateUuidPipe) id: string) {
    const isAlbumExist = await this.favoritesService.checkAlbumIdExists(id);
    if (!isAlbumExist) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', ValidateUuidPipe) id: string) {
    const isAlbumIdInFavorite =
      await this.favoritesService.isAlbumIdInFavorites(id);
    if (!isAlbumIdInFavorite) {
      throw new NotFoundException('Album is not favorite');
    }
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id', ValidateUuidPipe) id: string) {
    const isArtistExist = await this.favoritesService.checkArtistIdExists(id);
    if (!isArtistExist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', ValidateUuidPipe) id: string) {
    const isArtistIdInFavorite =
      await this.favoritesService.isArtistIdInFavorites(id);
    if (!isArtistIdInFavorite) {
      throw new NotFoundException('Artist is not favorite');
    }
    return this.favoritesService.removeArtist(id);
  }
}
