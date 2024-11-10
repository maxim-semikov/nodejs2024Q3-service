import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { DatabaseService } from '../../database/database.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, ValidateUuidPipe, DatabaseService],
})
export class TrackModule {}
