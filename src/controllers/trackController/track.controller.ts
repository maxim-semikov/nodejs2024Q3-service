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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { LoggingService } from '../../logging/logging.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  async findAll() {
    this.loggingService.log('Getting all tracks');
    const tracks = await this.trackService.findAll();
    this.loggingService.log(`Got all tracks`);
    return tracks;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    this.loggingService.log('Creating a track');
    const track = await this.trackService.create(createTrackDto);
    this.loggingService.log(`Created track: ${track.id}`);
    return track;
  }

  @Get(':id')
  async findOne(@Param('id', ValidateUuidPipe) id: string) {
    this.loggingService.log(`Getting track: ${id}`);
    const track = await this.trackService.findOne(id);
    this.loggingService.log(`Got track: ${id}`);
    return track;
  }

  @Put(':id')
  async update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    this.loggingService.log(`Updating track: ${id}`);
    const updatedTrack = await this.trackService.update(id, updateTrackDto);
    this.loggingService.log(`Updated track: ${id}`);
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ValidateUuidPipe) id: string) {
    this.loggingService.log(`Deleting track: ${id}`);
    const res = await this.trackService.remove(id);
    this.loggingService.log(`Deleted track: ${id}`);
    return res;
  }
}
