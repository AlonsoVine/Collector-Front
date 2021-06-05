import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  usuario: Usuario;
  numAlbums: number;

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this.getNumAlbums();
  }

 /* cargarUsuario(username: number):void{ //hacer bien la peticion en nuestro back está en usuario service getUsuario(ecomove)
    console.log(username);
    this.formcomponent.cargarDatosUsuario(username);
  }*/

  getNumAlbums () {
    this.usuarioService.getNumAlbumesUsuario(this.usuario.username).subscribe(
      response => {
        console.log(response);
        this.numAlbums = response as number;
      }
    )
  }

}
