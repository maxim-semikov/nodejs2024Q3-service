import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { LoggingService } from '../../logging/logging.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, ValidateUuidPipe, LoggingService],
  imports: [PrismaModule],
})
export class AlbumModule {}
