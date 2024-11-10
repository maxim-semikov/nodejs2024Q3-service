import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { DatabaseService } from '../../database/database.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ValidateUuidPipe, DatabaseService],
})
export class ArtistModule {}
