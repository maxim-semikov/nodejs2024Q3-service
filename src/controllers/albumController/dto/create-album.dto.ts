import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  year: number;

  @IsUUID(4)
  @IsOptional()
  artistId: string | null;
}
