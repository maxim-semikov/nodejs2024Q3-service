import { Artist } from '../../interface/interface';

export class ArtistEntityService {
  private static instance: ArtistEntityService;
  private artists: Map<string, Artist>;

  private constructor() {
    this.artists = new Map();
  }

  public static createArtistEntityService(): ArtistEntityService {
    if (!ArtistEntityService.instance) {
      ArtistEntityService.instance = new ArtistEntityService();
    }
    return ArtistEntityService.instance;
  }

  getAll(): Artist[] {
    return Array.from(this.artists.values());
  }

  create(data: Artist) {
    this.artists.set(data.id, data);
  }

  get(id: string): Artist | undefined {
    return this.artists.get(id);
  }

  update(id: string, value: Artist) {
    this.artists.set(id, value);
  }

  delete(id: string) {
    this.artists.delete(id);
  }
}
