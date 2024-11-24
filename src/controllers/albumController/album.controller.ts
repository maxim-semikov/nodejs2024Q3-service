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
import { LoggingService } from '../../logging/logging.service';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  async findAll() {
    this.loggingService.log('Getting all albums');
    const albums = await this.albumService.findAll();
    this.loggingService.log('Got all albums');
    return albums;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateAlbumDto) {
    this.loggingService.log('Creating an album');
    const album = await this.albumService.create(createArtistDto);
    this.loggingService.log(`Created album: ${album.id}`);
    return album;
  }

  @Get(':id')
  async findOne(@Param('id', ValidateUuidPipe) id: string) {
    this.loggingService.log(`Getting album: ${id}`);
    const album = await this.albumService.findOne(id);
    this.loggingService.log(`Got album: ${id}`);
    return album;
  }

  @Put(':id')
  async update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body() updateArtistDto: UpdateAlbumDto,
  ) {
    this.loggingService.log(`Updating album: ${id}`);
    const updatedAlbum = await this.albumService.update(id, updateArtistDto);
    this.loggingService.log(`Updated album: ${id}`);
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ValidateUuidPipe) id: string) {
    this.loggingService.log(`Deleting album: ${id}`);
    const result = await this.albumService.remove(id);
    this.loggingService.log(`Deleted album: ${id}`);
    return result;
  }
}
