import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from './album';
import { AlbumesService } from './albumes.service';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';


@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css']
})
export class AlbumesComponent implements OnInit {

  id: string;
  usuario: Usuario;
  albums: Album[];
  paginador: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumesService: AlbumesService,
    private usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let pagina: number = +params.get('page');
      if (!pagina) {
        pagina = 0;
      }

      this.obtenerAlbumes(pagina);
    })
  }

  obtenerAlbumes(pagina: number) {
    this.albumesService.getAlbumes(this.usuario.username, pagina.toString()).subscribe(
      response => {
        this.albums = response.content as Album[];
        this.paginador = response;
      });
  }

}
