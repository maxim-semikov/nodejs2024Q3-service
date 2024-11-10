import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { DatabaseService } from '../../database/database.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, ValidateUuidPipe, DatabaseService],
})
export class AlbumModule {}
