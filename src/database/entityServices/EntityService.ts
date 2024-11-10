export class EntityService<T extends { id: string }> {
  private entity: Map<string, T>;

  constructor() {
    this.entity = new Map();
  }

  getAll(): T[] {
    return Array.from(this.entity.values());
  }

  create(data: T) {
    this.entity.set(data.id, data);
  }

  get(id: string): T | undefined {
    return this.entity.get(id);
  }

  has(id: string): boolean {
    return this.entity.has(id);
  }

  update(id: string, value: T) {
    this.entity.set(id, value);
  }

  delete(id: string) {
    this.entity.delete(id);
  }
}
