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
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { FavoriteTypeValidatorPipe } from '../../pipes/favorite-type-validator.pipe';
import { startCase } from '../../helpers/startCase';
import { FavoriteTypes } from '../../interface/interface';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':favoriteType/:id')
  @HttpCode(HttpStatus.CREATED)
  async addToFavorite(
    @Param('id', ValidateUuidPipe) id: string,
    @Param('favoriteType', FavoriteTypeValidatorPipe)
    favoriteType: FavoriteTypes,
  ) {
    const isEntityExist = await this.favoritesService.checkEntityExists(
      id,
      favoriteType,
    );
    if (!isEntityExist) {
      throw new HttpException(
        `${startCase(favoriteType)} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.addToFavorite(id, favoriteType);
  }

  @Delete(':favoriteType/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFromFavorite(
    @Param('id', ValidateUuidPipe) id: string,
    @Param('favoriteType', FavoriteTypeValidatorPipe)
    favoriteType: FavoriteTypes,
  ) {
    const isEntityInFavorite = await this.favoritesService.isEntityInFavorites(
      id,
      favoriteType,
    );
    if (!isEntityInFavorite) {
      throw new NotFoundException(`${startCase(favoriteType)} is not favorite`);
    }
    return this.favoritesService.removeFromFavorite(id, favoriteType);
  }
}
