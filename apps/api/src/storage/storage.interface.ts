export interface StoredFile {
  url: string;
  key: string;
  size: number;
}

export interface DocumentStorage {
  save(
    buffer: Buffer,
    options: { folder?: string; name?: string; contentType?: string },
  ): Promise<StoredFile>;
  read(key: string): Promise<Buffer>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
}

export const DOCUMENT_STORAGE = 'DOCUMENT_STORAGE';