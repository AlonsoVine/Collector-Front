import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario'
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  usuario: Usuario = new Usuario();
  titulo: string = "Crear Cuenta";
  errores: string[];
  passwordConfirmada: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.usuarioService.getUsuario(id).subscribe((usuario) => {
          this.usuario = usuario;
          console.log(this.usuario);
        });
      }
    })
  }

  cargarDatosUsuario(id: number): void {
    console.log("cadw" + id);
    this.usuarioService.getUsuario(id).subscribe((usuario) => {
      this.setUsuario(usuario);
      this.router.navigate(['/usuarios/form']);
    });
  }

  setUsuario(usuario: Usuario) {
    console.log(usuario);
    this.usuario = usuario;

    console.log(this.usuario);
  }

  update(): void {

    this.usuarioService.update(this.usuario).subscribe(
      json => {
        this.usuario = json.usuario;
        sessionStorage.setItem("usuariologueado", JSON.stringify(this.usuario));
        this.router.navigate(['/usuarios/detalle']);
        Swal.fire(`¡Actualizado!`, `Tus datos han sido actualizados`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
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
