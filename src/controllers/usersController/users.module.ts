import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ValidateUuidPipe],
})
export class UsersModule {}
