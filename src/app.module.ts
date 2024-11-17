import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './controllers/artistController/artist.module';
import { UsersModule } from './controllers/usersController/users.module';
import { AlbumModule } from './controllers/albumController/album.module';
import { TrackModule } from './controllers/trackController/track.module';
import { FavoritesModule } from './controllers/favoritesController/favorites.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
