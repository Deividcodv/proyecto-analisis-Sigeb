import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { FilesystemStorageAdapter } from './filesystem.adapter';

describe('FilesystemStorageAdapter', () => {
  let tempDir: string;
  let adapter: FilesystemStorageAdapter;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sigeb-storage-'));
    const config = {
      get: jest.fn().mockReturnValue(tempDir),
    } as unknown as ConfigService;
    adapter = new FilesystemStorageAdapter(config);
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('guarda un archivo y devuelve url, key y tamaño', async () => {
    const stored = await adapter.save(Buffer.from('contenido'), {
      name: 'reporte.pdf',
    });

    expect(stored.key).toBeDefined();
    expect(stored.url).toMatch(/^\/storage\//);
    expect(stored.size).toBe(Buffer.byteLength('contenido'));
    expect(fs.existsSync(path.join(tempDir, stored.key))).toBe(true);
  });

  it('lee el contenido previamente guardado', async () => {
    const stored = await adapter.save(Buffer.from('hola mundo'));
    const buf = await adapter.read(stored.key);
    expect(buf.toString()).toBe('hola mundo');
  });

  it('confirma existencia y elimina archivos', async () => {
    const stored = await adapter.save(Buffer.from('temporal'));
    expect(await adapter.exists(stored.key)).toBe(true);

    await adapter.delete(stored.key);
    expect(await adapter.exists(stored.key)).toBe(false);
  });

  it('rechaza claves con path traversal fuera del root', async () => {
    await adapter.save(Buffer.from('x'), { name: 'a.txt' });

    await expect(adapter.read('../../outside.txt')).rejects.toThrow(
      'Invalid storage key',
    );
  });
});