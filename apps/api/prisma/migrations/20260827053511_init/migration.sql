-- CreateEnum
CREATE TYPE "UsuarioEstado" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "SolicitudEstado" AS ENUM ('BORRADOR', 'ENVIADA', 'EN_REVISION', 'CORRECCION', 'EVALUADA', 'APROBADA', 'RECHAZADA');

-- CreateEnum
CREATE TYPE "ConvocatoriaEstado" AS ENUM ('BORRADOR', 'ABIERTA', 'CERRADA', 'EN_EVALUACION', 'RESUELTA', 'ARCHIVADA');

-- CreateEnum
CREATE TYPE "PermisoEfecto" AS ENUM ('PERMITIR', 'DENEGAR');

-- CreateEnum
CREATE TYPE "SolicitudDocumentoEstado" AS ENUM ('PENDIENTE', 'CARGADO', 'RECHAZADO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "cui" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rolId" TEXT NOT NULL,
    "estado" "UsuarioEstado" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permiso" (
    "id" TEXT NOT NULL,
    "modulo" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol_permiso" (
    "id" TEXT NOT NULL,
    "rolId" TEXT NOT NULL,
    "permisoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rol_permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_permiso" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "permisoId" TEXT NOT NULL,
    "efecto" "PermisoEfecto" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genero" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nivel_academico" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "nivel_academico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipio" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "departamentoId" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "municipio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beca" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criterio_evaluacion" (
    "id" TEXT NOT NULL,
    "becaId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "criterio_evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "convocatoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "becaId" TEXT NOT NULL,
    "estado" "ConvocatoriaEstado" NOT NULL DEFAULT 'BORRADOR',
    "fechaApertura" TIMESTAMP(3),
    "fechaCierre" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "convocatoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "convocatoria_doc_requerido" (
    "id" TEXT NOT NULL,
    "convocatoriaId" TEXT NOT NULL,
    "documentoTipoId" TEXT NOT NULL,
    "obligatorio" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "convocatoria_doc_requerido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitud" (
    "id" TEXT NOT NULL,
    "convocatoriaId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "estado" "SolicitudEstado" NOT NULL DEFAULT 'BORRADOR',
    "correccionesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitud_perfil_academico" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "generoId" TEXT,
    "generoOtro" TEXT,
    "nivelAcademicoId" TEXT,
    "nivelAcademicoOtro" TEXT,
    "institucion" TEXT,
    "carrera" TEXT,
    "promedio" DOUBLE PRECISION,
    "departamentoId" TEXT,
    "departamentoOtro" TEXT,
    "municipioId" TEXT,
    "municipioOtro" TEXT,

    CONSTRAINT "solicitud_perfil_academico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitud_perfil_financiero" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "ingresoFamiliar" DOUBLE PRECISION,
    "numeroDependientes" INTEGER,
    "becasAnteriores" BOOLEAN NOT NULL DEFAULT false,
    "descripcionSituacion" TEXT,

    CONSTRAINT "solicitud_perfil_financiero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitud_documento" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "documentoTipoId" TEXT NOT NULL,
    "archivoUrl" TEXT NOT NULL,
    "estado" "SolicitudDocumentoEstado" NOT NULL DEFAULT 'PENDIENTE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solicitud_documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_estado" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "comentario" TEXT,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historial_estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documento_tipo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "documento_tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluacion" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "criterioEvaluacionId" TEXT NOT NULL,
    "evaluadorId" TEXT NOT NULL,
    "puntaje" DOUBLE PRECISION,
    "observaciones" TEXT,
    "completada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comite" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comite_miembro" (
    "id" TEXT NOT NULL,
    "comiteId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comite_miembro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sesion" (
    "id" TEXT NOT NULL,
    "comiteId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "lugar" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'PROGRAMADA',
    "quorumMinimo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sesion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voto" (
    "id" TEXT NOT NULL,
    "sesionId" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "voto" TEXT NOT NULL,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decision" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "sesionId" TEXT NOT NULL,
    "resultado" TEXT NOT NULL,
    "observaciones" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "decision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidadId" TEXT,
    "detalle" JSONB,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asistente_base_conocimiento" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "tags" TEXT[],
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asistente_base_conocimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asistente_conversacion" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT,
    "sesionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asistente_conversacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asistente_mensaje" (
    "id" TEXT NOT NULL,
    "conversacionId" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "contexto" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asistente_mensaje_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cui_key" ON "usuario"("cui");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_key" ON "rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "permiso_modulo_accion_key" ON "permiso"("modulo", "accion");

-- CreateIndex
CREATE UNIQUE INDEX "rol_permiso_rolId_permisoId_key" ON "rol_permiso"("rolId", "permisoId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_permiso_usuarioId_permisoId_key" ON "usuario_permiso"("usuarioId", "permisoId");

-- CreateIndex
CREATE UNIQUE INDEX "genero_nombre_key" ON "genero"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "nivel_academico_nombre_key" ON "nivel_academico"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "departamento_nombre_key" ON "departamento"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "municipio_nombre_departamentoId_key" ON "municipio"("nombre", "departamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "convocatoria_doc_requerido_convocatoriaId_documentoTipoId_key" ON "convocatoria_doc_requerido"("convocatoriaId", "documentoTipoId");

-- CreateIndex
CREATE UNIQUE INDEX "solicitud_perfil_academico_solicitudId_key" ON "solicitud_perfil_academico"("solicitudId");

-- CreateIndex
CREATE UNIQUE INDEX "solicitud_perfil_financiero_solicitudId_key" ON "solicitud_perfil_financiero"("solicitudId");

-- CreateIndex
CREATE UNIQUE INDEX "documento_tipo_nombre_key" ON "documento_tipo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "comite_miembro_comiteId_usuarioId_key" ON "comite_miembro"("comiteId", "usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "voto_sesionId_solicitudId_usuarioId_key" ON "voto"("sesionId", "solicitudId", "usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "decision_solicitudId_key" ON "decision"("solicitudId");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_permiso" ADD CONSTRAINT "rol_permiso_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_permiso" ADD CONSTRAINT "rol_permiso_permisoId_fkey" FOREIGN KEY ("permisoId") REFERENCES "permiso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_permiso" ADD CONSTRAINT "usuario_permiso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_permiso" ADD CONSTRAINT "usuario_permiso_permisoId_fkey" FOREIGN KEY ("permisoId") REFERENCES "permiso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "municipio" ADD CONSTRAINT "municipio_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criterio_evaluacion" ADD CONSTRAINT "criterio_evaluacion_becaId_fkey" FOREIGN KEY ("becaId") REFERENCES "beca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "convocatoria" ADD CONSTRAINT "convocatoria_becaId_fkey" FOREIGN KEY ("becaId") REFERENCES "beca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "convocatoria_doc_requerido" ADD CONSTRAINT "convocatoria_doc_requerido_convocatoriaId_fkey" FOREIGN KEY ("convocatoriaId") REFERENCES "convocatoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "convocatoria_doc_requerido" ADD CONSTRAINT "convocatoria_doc_requerido_documentoTipoId_fkey" FOREIGN KEY ("documentoTipoId") REFERENCES "documento_tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud" ADD CONSTRAINT "solicitud_convocatoriaId_fkey" FOREIGN KEY ("convocatoriaId") REFERENCES "convocatoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud" ADD CONSTRAINT "solicitud_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_perfil_academico" ADD CONSTRAINT "solicitud_perfil_academico_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_perfil_academico" ADD CONSTRAINT "solicitud_perfil_academico_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "genero"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_perfil_academico" ADD CONSTRAINT "solicitud_perfil_academico_nivelAcademicoId_fkey" FOREIGN KEY ("nivelAcademicoId") REFERENCES "nivel_academico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_perfil_academico" ADD CONSTRAINT "solicitud_perfil_academico_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "departamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_perfil_academico" ADD CONSTRAINT "solicitud_perfil_academico_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "municipio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_perfil_financiero" ADD CONSTRAINT "solicitud_perfil_financiero_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_documento" ADD CONSTRAINT "solicitud_documento_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_documento" ADD CONSTRAINT "solicitud_documento_documentoTipoId_fkey" FOREIGN KEY ("documentoTipoId") REFERENCES "documento_tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_estado" ADD CONSTRAINT "historial_estado_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluacion" ADD CONSTRAINT "evaluacion_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluacion" ADD CONSTRAINT "evaluacion_criterioEvaluacionId_fkey" FOREIGN KEY ("criterioEvaluacionId") REFERENCES "criterio_evaluacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluacion" ADD CONSTRAINT "evaluacion_evaluadorId_fkey" FOREIGN KEY ("evaluadorId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comite_miembro" ADD CONSTRAINT "comite_miembro_comiteId_fkey" FOREIGN KEY ("comiteId") REFERENCES "comite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comite_miembro" ADD CONSTRAINT "comite_miembro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesion" ADD CONSTRAINT "sesion_comiteId_fkey" FOREIGN KEY ("comiteId") REFERENCES "comite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voto" ADD CONSTRAINT "voto_sesionId_fkey" FOREIGN KEY ("sesionId") REFERENCES "sesion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voto" ADD CONSTRAINT "voto_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voto" ADD CONSTRAINT "voto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decision" ADD CONSTRAINT "decision_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decision" ADD CONSTRAINT "decision_sesionId_fkey" FOREIGN KEY ("sesionId") REFERENCES "sesion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistente_mensaje" ADD CONSTRAINT "asistente_mensaje_conversacionId_fkey" FOREIGN KEY ("conversacionId") REFERENCES "asistente_conversacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
