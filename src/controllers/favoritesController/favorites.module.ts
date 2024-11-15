import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, ValidateUuidPipe],
  imports: [PrismaModule],
})
export class FavoritesModule {}
