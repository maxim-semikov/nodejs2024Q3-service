import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { LoggingService } from '../../logging/logging.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ValidateUuidPipe, LoggingService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
