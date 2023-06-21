import { Jornada } from "./jornada";

export class Especialidad {
    constructor(
        public id?: string,
        public nombre?: string,
        public duracionTurno?: number,
        public habilitado?: boolean,
    ) { }
}
