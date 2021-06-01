import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-album',
  templateUrl: './formalbum.component.html',
  styleUrls: ['./formalbum.component.css']
})
export class FormAlbumComponent implements OnInit {

  usuario: Usuario = new Usuario();
  titulo: string = "Crear Album";
  errores: string[];

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
    this.usuarioService.create(this.usuario).subscribe(
      usuario => {
        this.router.navigate(['/usuarios']);
        Swal.fire(`Nuevo usuario`, `Usuario ${usuario.username} creado`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }


}
