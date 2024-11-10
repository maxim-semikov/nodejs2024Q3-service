import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateAlbumDto) {
    return this.albumService.create(createArtistDto);
  }

  @Get(':id')
  findOne(@Param('id', ValidateUuidPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body() updateArtistDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ValidateUuidPipe) id: string) {
    return this.albumService.remove(id);
  }
}
