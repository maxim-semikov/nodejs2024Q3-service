export class FavoriteSet {
  private value: Set<string>;

  constructor() {
    this.value = new Set();
  }

  getAll(): string[] {
    return Array.from(this.value.values()) || [];
  }

  add(id: string) {
    this.value.add(id);
  }

  delete(id: string) {
    this.value.delete(id);
  }

  has(id: string) {
    return this.value.has(id);
  }
}
