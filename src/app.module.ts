import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './controllers/artistController/artist.module';
import { UsersModule } from './controllers/usersController/users.module';
import { DatabaseModule } from './database/database.module';
import { AlbumModule } from './controllers/albumController/album.module';
import { TrackModule } from './controllers/trackController/track.module';
import { FavoritesModule } from './controllers/favoritesController/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseModule],
})
export class AppModule {}
