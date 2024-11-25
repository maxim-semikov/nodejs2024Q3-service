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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { LoggingService } from '../../logging/logging.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  async findAll() {
    this.loggingService.log('Get all artists');
    const artists = await this.artistService.findAll();
    this.loggingService.log('Got all artists');
    return artists;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto) {
    this.loggingService.log('Creat an artist');
    const artist = await this.artistService.create(createArtistDto);
    this.loggingService.log(`Created artist: ${artist.id}`);
    return artist;
  }

  @Get(':id')
  async findOne(@Param('id', ValidateUuidPipe) id: string) {
    this.loggingService.log(`Getting artist with ID: ${id}`);
    const artist = await this.artistService.findOne(id);
    this.loggingService.log(`Got artist: ${id}`);
    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    this.loggingService.log(`Updating artist: ${id}`);
    const updatedArtist = await this.artistService.update(id, updateArtistDto);
    this.loggingService.log(`Updated artist: ${id}`);
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ValidateUuidPipe) id: string) {
    this.loggingService.log(`Deleting artist: ${id}`);
    const result = await this.artistService.remove(id);
    this.loggingService.log(`Deleted artist: ${id}`);
    return result;
  }
}
