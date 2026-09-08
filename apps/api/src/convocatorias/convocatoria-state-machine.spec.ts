import { BadRequestException } from '@nestjs/common';
import {
  ConvocatoriaStateMachine,
  CONVOCATORIA_ESTADOS,
} from './convocatoria-state-machine';

describe('ConvocatoriaStateMachine', () => {
  it('publica BORRADOR -> ABIERTA', () => {
    expect(ConvocatoriaStateMachine.next('BORRADOR', 'publicar')).toBe('ABIERTA');
  });

  it('recorre el flujo principal completo', () => {
    let estado: string = 'BORRADOR';
    const acciones: Array<[string, string]> = [
      ['publicar', 'ABIERTA'],
      ['cerrar', 'CERRADA'],
      ['iniciar_evaluacion', 'EN_EVALUACION'],
      ['resolver', 'RESUELTA'],
      ['archivar', 'ARCHIVADA'],
    ];

    for (const [accion, esperado] of acciones) {
      estado = ConvocatoriaStateMachine.next(estado as never, accion as never);
      expect(estado).toBe(esperado);
    }
  });

  it('permite reabrir CERRADA -> ABIERTA', () => {
    expect(ConvocatoriaStateMachine.next('CERRADA', 'reabrir')).toBe('ABIERTA');
  });

  it('rechaza transiciones inválidas con BadRequestException', () => {
    expect(() => ConvocatoriaStateMachine.next('BORRADOR', 'resolver')).toThrow(
      BadRequestException,
    );
    expect(() => ConvocatoriaStateMachine.next('ABIERTA', 'publicar')).toThrow(
      BadRequestException,
    );
    expect(() => ConvocatoriaStateMachine.next('BORRADOR', 'iniciar_evaluacion')).toThrow(
      BadRequestException,
    );
  });

  it('isAllowed refleja las transiciones válidas', () => {
    expect(ConvocatoriaStateMachine.isAllowed('BORRADOR', 'publicar')).toBe(true);
    expect(ConvocatoriaStateMachine.isAllowed('BORRADOR', 'resolver')).toBe(false);
    expect(ConvocatoriaStateMachine.isAllowed('ARCHIVADA', 'reabrir')).toBe(true);
  });

  it('expone los seis estados del flujo', () => {
    expect(CONVOCATORIA_ESTADOS).toEqual([
      'BORRADOR',
      'ABIERTA',
      'CERRADA',
      'EN_EVALUACION',
      'RESUELTA',
      'ARCHIVADA',
    ]);
  });
});