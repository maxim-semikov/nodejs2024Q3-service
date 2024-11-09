import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUserIdPipe } from '../../pipes/validate-user-id.pipe';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ValidateUserIdPipe],
})
export class UsersModule {}
