import { Usuario, ERole } from "./usuario";
import { Especialidad } from './especialidad';

export class Especialista extends Usuario {
    constructor(
        email: string,
        password: string,
        uid?: string | undefined,
        id?: string | undefined,
        displayName?: string | undefined,
        photoURL?: string | undefined,
        emailVerified?: boolean | undefined,
        nombre?: string | undefined,
        apellido?: string | undefined,
        sexo?: string | undefined,
        dni?: string | undefined,
        edad?: string | undefined,
        fechaNacimiento?: string | undefined,
        foto?: string | undefined,
        role?: ERole | undefined,
        habilitado?: boolean | undefined,
        public especialidad?: Especialidad[]
    ) {
        super(
            email,
            password,
            uid,
            id,
            displayName,
            photoURL,
            emailVerified,
            nombre,
            apellido,
            sexo,
            dni,
            edad,
            fechaNacimiento,
            foto,
            role,
            habilitado
        );
    }
}
