import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ValidateUuidPipe],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
