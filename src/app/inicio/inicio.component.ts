import { Component, OnInit } from '@angular/core';
import { Usuario } from "../usuarios/usuario";
import { UsuarioService } from '../usuarios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: Usuario;
  usuarios: Usuario[];
  paginador: any;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let pagina : number = +params.get('page');
      if (!pagina) {
        pagina = 0;
      }
      this.usuarioService.getUsuarios(pagina).pipe(
        tap((response: any) =>{
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

}
2