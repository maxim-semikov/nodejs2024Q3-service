import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { LoggingService } from '../../logging/logging.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ValidateUuidPipe, LoggingService],
  imports: [PrismaModule],
})
export class ArtistModule {}
