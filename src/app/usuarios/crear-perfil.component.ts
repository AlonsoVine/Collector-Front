import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario'
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent implements OnInit {

  usuario: Usuario;
  errores: string[];
  passwordConfirmada: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  create(): void {
    if(this.usuario.password == this.passwordConfirmada){
      this.usuarioService.create(this.usuario).subscribe(
        usuario => {
          this.router.navigate(['/login']);
          Swal.fire(`Nuevo usuario`, `Usuario ${usuario.username} creado`, 'success');
        }/*,
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }*/
      )
    }else{
      Swal.fire(`Contraseñas distintas`, `Las contraseñas no coinciden`, 'error')
    }
    
  }


}
