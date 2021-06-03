import { Component, OnInit } from '@angular/core';
import { Usuario } from "./usuario";
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario;
  usuarios: Usuario[];
  paginador: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
  }

  /*  ngOnInit(){
      this.usuarioService.getUsuarios().pipe(tap(usuarios=>this.usuarios=usuarios)).subscribe();
    }*/

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let pagina: number = +params.get('page');
      if (!pagina) {
        pagina = 0;
      }
      this.usuarioService.getUsuarios(pagina)
        .pipe(
          tap((response: any) => {
            this.usuarios = response.content as Usuario[];
            this.paginador = response;
            console.log('UsuarioComponent: tap 3');
            (response.content as Usuario[]).forEach(usuario => {
              console.log(usuario);
            });
          })
        ).subscribe();
    });
  }

  delete(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-3'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `Eliminando el usuario ${usuario.username}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.username).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(user => user !== usuario)
            swalWithBootstrapButtons.fire(
              'Eliminado',
              `El usuario ${usuario.username} fue eliminado con exíto!`,
              'success'
            )
          }
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Eliminación no realizada',
          'error'
        )
      }
    })
  }

}

/*ngOnInit(){
  this.usuarioService.getUsuarios().subscribe(
    usuarios => this.usuarios=usuarios //<- modo función anónima 1
    (usuarios) => { // <-modo función anónima 2
      this.usuarios=usuarios
    }
    function (usuarios){//<- modo función clásica
      this.usuarios=usuarios
    }
  );
}*/
