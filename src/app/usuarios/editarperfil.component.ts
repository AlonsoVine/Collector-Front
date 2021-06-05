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
  usuarioEditado: Usuario;
  errores: string[];
  passwordConfirmada: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.usuario = usuarioService.usuario;
    this.usuarioEditado = new Usuario();
  }

  ngOnInit(): void {
  }

  editar(): void {
    this.usuarioService.update(this.usuario.username, this.usuarioEditado).subscribe(
      response => {
        this.usuario = response;
        sessionStorage.setItem("usuariologueado", JSON.stringify(this.usuario));
        Swal.fire(`Perfil editado`, `Usuario con nombre ${this.usuario.nombre}`, 'success');
        console.log(this.usuario);
        this.router.navigate(['/perfil']);
        
      }
    )
  }

}
