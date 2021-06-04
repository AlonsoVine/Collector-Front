import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  usuario: Usuario;
  errores: string[];
  passwordConfirmada: string;

  constructor(
    private usuarioService: UsuarioService,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.usuario = usuarioService.usuario;

   }

  ngOnInit(): void {
    this.cargarUsuario()
  }

  cargarUsuario(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let nombre = params['nombre'];
        if(nombre){
          this.usuarioService.getUsuario(nombre).subscribe(
            (usuario ) => {
              this.usuario.nombre = usuario.nombre;
            }
          )
        }
      }
    )
  }

  editar():void{
    this.usuarioService.update(this.usuario).subscribe(
      response => {
        this.usuario = response.usuario;
        sessionStorage.setItem("usuariologueado",JSON.stringify(this.usuario));
        this.router.navigate(['/perfil']);
        Swal.fire(`Perfil editado`,`Usuario con nombre ${this.usuario.nombre}`, 'success');
        console.log(response);
      }
    )
  }

}
