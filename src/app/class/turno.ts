import { Encuesta } from './encuesta';
import { Especialidad } from './especialidad';
import { Especialista } from './usuarios/especialista';


export class Turno {
    constructor(
        public id?: string,
        public fecha?: Date,
        public dia?: string,
        public especialista?: Especialista,
        public especialidad?: Especialidad,
        public estado?: Estado,
        public motivoRechazo?: string,
        public encuesta?: Encuesta,
    ) { }
}


export enum Estado {
    aceptado = 'aceptado',
    rechazado = 'recahazado',
    cumplido = 'cumplido',
    anulado = 'anulado',
    ocupado = 'ocupado',
    disponible = 'disponible'
}
