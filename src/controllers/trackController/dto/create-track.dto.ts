import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID(4)
  @IsOptional()
  artistId: string | null;

  @IsUUID(4)
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @Min(1)
  duration: number;
}
