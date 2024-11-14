import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ValidateUuidPipe],
  imports: [PrismaModule],
})
export class ArtistModule {}
