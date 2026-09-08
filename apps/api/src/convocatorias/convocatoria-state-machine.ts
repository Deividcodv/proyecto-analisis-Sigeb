import { BadRequestException } from '@nestjs/common';

export type ConvocatoriaEstado =
  | 'BORRADOR'
  | 'ABIERTA'
  | 'CERRADA'
  | 'EN_EVALUACION'
  | 'RESUELTA'
  | 'ARCHIVADA';

export type ConvocatoriaTransicion =
  | 'publicar'
  | 'cerrar'
  | 'iniciar_evaluacion'
  | 'resolver'
  | 'reabrir'
  | 'archivar';

const TRANSITIONS: Record<ConvocatoriaEstado, Partial<Record<ConvocatoriaTransicion, ConvocatoriaEstado>>> = {
  BORRADOR: { publicar: 'ABIERTA', archivar: 'ARCHIVADA' },
  ABIERTA: { cerrar: 'CERRADA', archivar: 'ARCHIVADA' },
  CERRADA: { iniciar_evaluacion: 'EN_EVALUACION', reabrir: 'ABIERTA' },
  EN_EVALUACION: { resolver: 'RESUELTA', archivar: 'ARCHIVADA' },
  RESUELTA: { archivar: 'ARCHIVADA' },
  ARCHIVADA: { reabrir: 'ABIERTA' },
};

export const CONVOCATORIA_ESTADOS: ConvocatoriaEstado[] = [
  'BORRADOR',
  'ABIERTA',
  'CERRADA',
  'EN_EVALUACION',
  'RESUELTA',
  'ARCHIVADA',
];

export class ConvocatoriaStateMachine {
  static next(estadoActual: ConvocatoriaEstado, accion: ConvocatoriaTransicion): ConvocatoriaEstado {
    const destino = TRANSITIONS[estadoActual]?.[accion];

    if (!destino) {
      throw new BadRequestException(
        `Transición inválida: "${accion}" no es válida desde estado "${estadoActual}"`,
      );
    }

    return destino;
  }

  static isAllowed(estadoActual: ConvocatoriaEstado, accion: ConvocatoriaTransicion): boolean {
    return Boolean(TRANSITIONS[estadoActual]?.[accion]);
  }
}