import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentStorage, StoredFile } from './storage.interface';

@Injectable()
export class FilesystemStorageAdapter implements DocumentStorage {
  private readonly root: string;

  constructor(private readonly configService: ConfigService) {
    this.root = path.resolve(
      this.configService.get<string>('STORAGE_PATH') || './storage',
    );
    this.ensureRoot();
  }

  private ensureRoot() {
    if (!fs.existsSync(this.root)) {
      fs.mkdirSync(this.root, { recursive: true });
    }
  }

  private resolveKey(key: string): string {
    const resolved = path.resolve(this.root, key);
    if (!resolved.startsWith(this.root)) {
      throw new Error(`Invalid storage key: ${key}`);
    }
    return resolved;
  }

  async save(
    buffer: Buffer,
    options: { folder?: string; name?: string } = {},
  ): Promise<StoredFile> {
    const folder = options.folder || 'general';
    const ext = options.name ? path.extname(options.name) : '';
    const key = path.join(folder, `${randomUUID()}${ext}`);

    const fullPath = this.resolveKey(key);
    await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.promises.writeFile(fullPath, buffer);

    return {
      url: `/storage/${key.replace(/\\/g, '/')}`,
      key,
      size: buffer.length,
    };
  }

  async read(key: string): Promise<Buffer> {
    return fs.promises.readFile(this.resolveKey(key));
  }

  async delete(key: string): Promise<void> {
    await fs.promises.unlink(this.resolveKey(key));
  }

  async exists(key: string): Promise<boolean> {
    return fs.existsSync(this.resolveKey(key));
  }
}