import { Album } from '../../interface/interface';

export class AlbumEntityService {
  private static instance: AlbumEntityService;
  private albums: Map<string, Album>;

  private constructor() {
    this.albums = new Map();
  }

  public static createAlbumEntityService(): AlbumEntityService {
    if (!AlbumEntityService.instance) {
      AlbumEntityService.instance = new AlbumEntityService();
    }
    return AlbumEntityService.instance;
  }

  getAll(): Album[] {
    return Array.from(this.albums.values());
  }

  create(data: Album) {
    this.albums.set(data.id, data);
  }

  get(id: string): Album | undefined {
    return this.albums.get(id);
  }

  update(id: string, value: Album) {
    this.albums.set(id, value);
  }

  delete(id: string) {
    this.albums.delete(id);
  }
}
