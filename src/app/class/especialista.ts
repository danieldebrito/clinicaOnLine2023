import { User } from "./user";
import { Especialidad } from './especialidad';

export class Especialista extends User {
    constructor(
        public especialidad?: Especialidad[],
    ) {
        super();
     }
}
