import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/class/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];

  constructor( private usuariosSvc: UsuariosService ){}

  public getUsuarios(){
    this.usuariosSvc.getItems().subscribe( res => {
      this.usuarios = res;
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

}





