import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, ValidateUuidPipe],
})
export class FavoritesModule {}
