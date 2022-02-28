export default class Storage<T> {
  public static new<K>(key: string) {
    return new Storage<K>(key);
  }

  constructor(
    private readonly key: string,
    private readonly parsed: boolean = true,
  ) {}

  public get(): T | null {
    const item = localStorage.getItem(this.key);
    if (this.parsed && item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        return null;
      }
    }

    return item as unknown as T;
  }

  public set(value: any): void {
    let data = value;
    if (this.parsed) {
      data = JSON.stringify(value);
    }

    localStorage.setItem(this.key, data);
  }

  public remove() {
    localStorage.removeItem(this.key);
  }
}
