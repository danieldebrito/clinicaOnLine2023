export class User {
  constructor(
    public uid?: string,
    public id?: string,
    public email?: string | null | undefined,
    public password?: string | null | undefined,
    public displayName?: string,
    public photoURL?: string,
    public emailVerified?: string,
    public nombre?: string,
    public apellido?: string,
    public sexo?: string,
    public dni?: string,
    public edad?: string,
    public fechaNacimiento?: string,
    public foto?: string,
    public role?: string,
    public habilitado?: boolean
  ) { }
}