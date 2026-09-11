import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { CatalogosModule } from './catalogos/catalogos.module';
import { ConvocatoriasModule } from './convocatorias/convocatorias.module';
import { AuditModule } from './audit/audit.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CommonModule,
    StorageModule,
    AuthModule,
    UsersModule,
    CatalogosModule,
    ConvocatoriasModule,
    AuditModule,
    SolicitudesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}