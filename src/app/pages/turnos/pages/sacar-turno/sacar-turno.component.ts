import { Component, OnInit } from '@angular/core';
import { Jornada } from 'src/app/class/jornada';
import { NgbNavChangeEvent, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { Especialista } from 'src/app/class/usuarios/especialista';
import { Especialidad } from 'src/app/class/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Turno } from 'src/app/class/turno';
import { JornadasService } from 'src/app/services/jornadas.service';
import { ERole, Usuario } from 'src/app/auth/class/usuario';


@Component({
	selector: 'app-sacar-turno',
	templateUrl: './sacar-turno.component.html',
	styleUrls: ['./sacar-turno.component.scss']
})
export class SacarTurnoComponent implements OnInit {
	public active = 1;
	public disabled = true;

	public especialistas: Especialista[] = [];
	public especialistasFiltrados: Especialista[] = [];
	public especialista: any = {};

	public especialidades: Especialidad[] = [];
	public especialidadSeleccionadaNombre: String = '';

	public especialidadesNombre: String[] = [];

	public turnos: Turno[] = [];

	public jornadas: Jornada[] = [];
	public jornadasFiltradas: Jornada[] = [];

	constructor(
		private usuariosSv: UsuariosService,
		private especialidadesSv: EspecialidadesService,
		private jornadasSv: JornadasService
	) {

	}

	onNavChange(changeEvent: NgbNavChangeEvent) {
		if (changeEvent.nextId === 3 || 2) {
			changeEvent.preventDefault();
		}
	}

	toggleDisabled() {
		this.disabled = !this.disabled;
		if (this.disabled) {
			this.active = 1;
		}
	}

	// ESPECIALISTAS ///////////////////////////////////////////////////////////////////////////

	public getEspecialistas() {

		let usuarios: Usuario[] = [];

		this.usuariosSv.getItems().subscribe(res => {
			usuarios = res;
			this.especialistas = usuarios.filter(usr => usr.role == ERole.especialista);
		})
	}

	// ESPECIALIDADES ////////////////////////////////////////////////////////////////////////
	public getEspecialidades() {
		this.especialidadesSv.getItems().subscribe(res => {
			this.especialidades = res;
		});
	}

	public getEspecialidadesNombre() {
		this.jornadasSv.getItems().subscribe(res => {
			this.jornadas = res;

			this.jornadas.forEach(e => {
				const especialidad = e.especialidad || ''; // Asignación predeterminada en caso de ser undefined
				this.especialidadesNombre.push(especialidad);
			});

			this.especialidadesNombre = [...new Set(this.especialidadesNombre)];
		});
	}




	public getEspecialistasEspecialidad(event: any) {

		this.especialidadSeleccionadaNombre = event;

		let especialistasUIDS: string[] = this.jornadas
			.filter(j => j.especialidad === event)
			.map(j => j.userUID)
			.filter(uid => typeof uid === 'string') as string[];

		this.especialistasFiltrados = this.especialistas.filter(e => e.uid && especialistasUIDS.includes(e.uid));
	}


	// JORNADAS ///////////////////////////////////////////////////////////////////////////


	public getJornadas() {
		this.jornadasSv.getItems().subscribe(res => {
			this.jornadas = res;
		});
	}

	public getjornadasEspecialista(event: Usuario) {

		this.jornadasFiltradas = this.jornadas.filter( j => (j.especialidad == this.especialidadSeleccionadaNombre && j.userUID == event.uid) );

		this.especialista = event;

		console.log(this.especialista);
	}


	ngOnInit(): void {
		this.getEspecialistas();
		this.getEspecialidadesNombre();
		//this.getJornadas();
	}

}
