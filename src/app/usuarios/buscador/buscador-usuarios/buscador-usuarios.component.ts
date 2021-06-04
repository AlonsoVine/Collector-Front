import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../usuario";
import { UsuarioService } from '../../usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-buscador-usuarios',
  templateUrl: './buscador-usuarios.component.html',
  styleUrls: ['./buscador-usuarios.component.css']
})
export class BuscadorUsuariosComponent implements OnInit {

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
