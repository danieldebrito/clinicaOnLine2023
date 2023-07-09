import { Component, OnInit } from '@angular/core';
import { Jornada } from 'src/app/class/jornada';
import { NgbNavChangeEvent, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { Especialista } from 'src/app/class/usuarios/especialista';
import { Especialidad } from 'src/app/class/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Turno } from 'src/app/class/turno';


@Component({
	selector: 'app-sacar-turno',
	templateUrl: './sacar-turno.component.html',
	styleUrls: ['./sacar-turno.component.scss']
})
export class SacarTurnoComponent implements OnInit {
	public active = 1;
	public disabled = true;

	public especialistas: Especialista[] = [];
	public especialidades: Especialidad[] = [];
	public turnos: Turno[] = [];
	public jornadas: Jornada[] = [];

	constructor(
		private usuariosSv: UsuariosService,
		private especialidadesSv: EspecialidadesService
	) {

	}

	onNavChange(changeEvent: NgbNavChangeEvent) {
		if (changeEvent.nextId === 3 || 2 ) {
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
		this.usuariosSv.getItems().subscribe( res => {
			this.especialistas = res;
		})
	}

	//////////////////////////////////////////////////////////////////////////


	public getEspecialidades(){
		this.especialidadesSv.getItems().subscribe( res => {
			this.especialidades = res;
		} );
	}

	ngOnInit(): void {
		this.getEspecialistas();
		this.getEspecialidades();
	}

}
