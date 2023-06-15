import { User } from "./usuario";
import { Especialidad } from './especialidad';

export class Especialista extends User {
    constructor(
        public especialidad?: Especialidad[],
    ) {
        super();
     }
}
