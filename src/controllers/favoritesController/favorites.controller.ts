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
import { LoggingService } from '../../logging/logging.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  async findAll() {
    this.loggingService.log('Getting all favorites');
    const favorites = await this.favoritesService.findAll();
    this.loggingService.log(`Fetched favorite items`);
    return favorites;
  }

  @Post(':favoriteType/:id')
  @HttpCode(HttpStatus.CREATED)
  async addToFavorite(
    @Param('id', ValidateUuidPipe) id: string,
    @Param('favoriteType', FavoriteTypeValidatorPipe)
    favoriteType: FavoriteTypes,
  ) {
    this.loggingService.log(
      `Attempting to add ${favoriteType} with id ${id} to favorites`,
    );
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

    const res = await this.favoritesService.addToFavorite(id, favoriteType);
    this.loggingService.log(`${favoriteType} with id ${id} added to favorites`);
    return res;
  }

  @Delete(':favoriteType/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFromFavorite(
    @Param('id', ValidateUuidPipe) id: string,
    @Param('favoriteType', FavoriteTypeValidatorPipe)
    favoriteType: FavoriteTypes,
  ) {
    this.loggingService.log(
      `Attempting to remove ${favoriteType} with id ${id} from favorites`,
    );
    const isEntityInFavorite = await this.favoritesService.isEntityInFavorites(
      id,
      favoriteType,
    );
    if (!isEntityInFavorite) {
      throw new NotFoundException(`${startCase(favoriteType)} is not favorite`);
    }
    const result = await this.favoritesService.removeFromFavorite(
      id,
      favoriteType,
    );
    this.loggingService.log(
      `${favoriteType} with id ${id} removed from favorites`,
    );
    return result;
  }
}
