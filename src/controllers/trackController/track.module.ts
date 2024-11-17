import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService, ValidateUuidPipe],
  imports: [PrismaModule],
})
export class TrackModule {}
