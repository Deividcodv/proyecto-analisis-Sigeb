import { Module, Global } from '@nestjs/common';
import { DOCUMENT_STORAGE } from './storage.interface';
import { FilesystemStorageAdapter } from './filesystem.adapter';

@Global()
@Module({
  providers: [
    {
      provide: DOCUMENT_STORAGE,
      useClass: FilesystemStorageAdapter,
    },
  ],
  exports: [DOCUMENT_STORAGE],
})
export class StorageModule {}