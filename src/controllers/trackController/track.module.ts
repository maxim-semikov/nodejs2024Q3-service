import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { LoggingService } from '../../logging/logging.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, ValidateUuidPipe, LoggingService],
  imports: [PrismaModule],
})
export class TrackModule {}
