import { Track } from '../../interface/interface';

export class TrackEntityService {
  private static instance: TrackEntityService;
  private track: Map<string, Track>;

  private constructor() {
    this.track = new Map();
  }

  public static createTrackEntityService(): TrackEntityService {
    if (!TrackEntityService.instance) {
      TrackEntityService.instance = new TrackEntityService();
    }
    return TrackEntityService.instance;
  }

  getAll(): Track[] {
    return Array.from(this.track.values());
  }

  create(data: Track) {
    this.track.set(data.id, data);
  }

  get(id: string): Track | undefined {
    return this.track.get(id);
  }

  update(id: string, value: Track) {
    this.track.set(id, value);
  }

  delete(id: string) {
    this.track.delete(id);
  }
}
