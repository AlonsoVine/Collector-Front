import { Component, OnInit } from '@angular/core';
import { Usuario } from "./usuario";
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  errores: string[];

  constructor(
    private usuarioService: UsuarioService,
    private router:Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.usuarioService.isAuthenticated()){
      Swal.fire('Login', `Hola ${this.usuarioService.usuario.username} ya estás autenticado`, 'info');
      this.router.navigate(['/albumes']);
    }
  }

  cerrarSesion():void{
    localStorage.removeItem('usuariologueado');
  }

  loguear():void{
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', '¡username o password vacías!', 'error');
      return;
    }
    this.usuarioService.getUsuarioLogin(this.usuario).subscribe(
      response=>{
        //console.log(response);
        //console.log(JSON.parse(atob(response.access_token.split(".")[1])));
        this.usuarioService.guardarUsuario(response.usuario);

        let usuario = this.usuarioService.usuario;
        this.router.navigate(['/albumes']);
        Swal.fire('Login', `Bienvenido ${usuario.username}, has iniciado sesión con éxito`, 'success');
      },
      err=>{
        if(err.status == 400 || err.status == 401){
          Swal.fire('Error Login', '¡username o clave incorrectas!', 'error');
        }
      }
    );
  }

  getThisUsuarioLogueado(){
    return this.usuario;
  }


}
