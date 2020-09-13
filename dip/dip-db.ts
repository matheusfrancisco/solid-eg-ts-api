export interface DatabaseStorage {
  insert(record: any) : void;
  getAll() : any[];
}

export class MemoryStorage implements DatabaseStorage {
  private storage : any[];

  constructor() {
    this.storage = [];
  }

  public insert(record: any) {
    this.storage.push(record);
  }

  public getAll() : any[] {
    return this.storage;
  }
}

export class PostService {
  private db : DatabaseStorage;

  constructor(db: DatabaseStorage) {
    this.db = db;
  }

  createPost(title: string) {
    this.db.insert(title);
  }
}