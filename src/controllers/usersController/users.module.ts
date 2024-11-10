import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { DatabaseService } from '../../database/database.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ValidateUuidPipe, DatabaseService],
})
export class UsersModule {}
