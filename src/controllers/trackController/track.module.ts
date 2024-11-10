import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, ValidateUuidPipe],
})
export class TrackModule {}
