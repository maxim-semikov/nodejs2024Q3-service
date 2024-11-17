import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Old password must not be empty.' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'New password must not be empty.' })
  newPassword: string;
}
