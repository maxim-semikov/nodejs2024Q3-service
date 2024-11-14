import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, ValidateUuidPipe],
  imports: [PrismaModule],
})
export class AlbumModule {}
