import { BadRequestException } from '@nestjs/common';
import {
  SolicitudStateMachine,
  SOLICITUD_ESTADOS,
} from './solicitud-state-machine';

describe('SolicitudStateMachine', () => {
  it('envía BORRADOR -> ENVIADA', () => {
    expect(SolicitudStateMachine.next('BORRADOR', 'enviar')).toBe('ENVIADA');
  });

  it('recorre el flujo principal completo', () => {
    let estado: string = 'BORRADOR';
    const acciones: Array<[string, string]> = [
      ['enviar', 'ENVIADA'],
      ['iniciar_revision', 'EN_REVISION'],
      ['evaluar', 'EVALUADA'],
      ['aprobar', 'APROBADA'],
    ];

    for (const [accion, esperado] of acciones) {
      estado = SolicitudStateMachine.next(estado as never, accion as never);
      expect(estado).toBe(esperado);
    }
  });

  it('recorre el flujo con correcciones', () => {
    let estado: string = 'BORRADOR';
    const acciones: Array<[string, string]> = [
      ['enviar', 'ENVIADA'],
      ['iniciar_revision', 'EN_REVISION'],
      ['solicitar_correccion', 'CORRECCION'],
      ['corregir', 'BORRADOR'],
      ['enviar', 'ENVIADA'],
    ];

    for (const [accion, esperado] of acciones) {
      estado = SolicitudStateMachine.next(estado as never, accion as never);
      expect(estado).toBe(esperado);
    }
  });

  it('permite rechazar una solicitud evaluada', () => {
    expect(SolicitudStateMachine.next('EVALUADA', 'rechazar')).toBe('RECHAZADA');
  });

  it('rechaza transiciones inválidas con BadRequestException', () => {
    expect(() => SolicitudStateMachine.next('BORRADOR', 'aprobar')).toThrow(
      BadRequestException,
    );
    expect(() => SolicitudStateMachine.next('ENVIADA', 'enviar')).toThrow(
      BadRequestException,
    );
    expect(() => SolicitudStateMachine.next('APROBADA', 'rechazar')).toThrow(
      BadRequestException,
    );
  });

  it('isAllowed refleja las transiciones válidas', () => {
    expect(SolicitudStateMachine.isAllowed('BORRADOR', 'enviar')).toBe(true);
    expect(SolicitudStateMachine.isAllowed('BORRADOR', 'evaluar')).toBe(false);
    expect(SolicitudStateMachine.isAllowed('CORRECCION', 'corregir')).toBe(true);
  });

  it('expone los siete estados del flujo', () => {
    expect(SOLICITUD_ESTADOS).toEqual([
      'BORRADOR',
      'ENVIADA',
      'EN_REVISION',
      'CORRECCION',
      'EVALUADA',
      'APROBADA',
      'RECHAZADA',
    ]);
  });
});