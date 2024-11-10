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
  addTrack(@Param('id', ValidateUuidPipe) id: string) {
    if (!this.favoritesService.checkTrackIdExists(id)) {
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
  addAlbum(@Param('id', ValidateUuidPipe) id: string) {
    if (!this.favoritesService.checkAlbumIdExists(id)) {
      throw new HttpException(
        'Album not found in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ValidateUuidPipe) id: string) {
    if (!this.favoritesService.isAlbumIdInFavorites(id)) {
      throw new NotFoundException('Album is not favorite');
    }
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', ValidateUuidPipe) id: string) {
    if (!this.favoritesService.checkArtistIdExists(id)) {
      throw new HttpException(
        'Artist not found in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ValidateUuidPipe) id: string) {
    if (!this.favoritesService.isArtistIdInFavorites(id)) {
      throw new NotFoundException('Artist is not favorite');
    }
    return this.favoritesService.removeArtist(id);
  }
}
