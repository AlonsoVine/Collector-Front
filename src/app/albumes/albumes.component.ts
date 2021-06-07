import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from './album/album';
import { AlbumesService } from './albumes.service';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import Swal from 'sweetalert2';


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
    private usuarioService: UsuarioService,
    private router: Router
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

  crearAlbum () {
    Swal.fire({
      title: "Nuevo album",
      text: "Ponle un título a tu album",
      inputPlaceholder: "Album Épico",
      input: 'text',
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== '') {
            resolve(null);
          } else {
            resolve('Debes escoger un nombre para tu album');
          }
        });
      }
  }).then((result) => {
      if (result.isConfirmed) {
        this.albumesService.createAlbum(result.value, this.usuario.username).subscribe(
          (response) => {
            this.router.navigate(['album', response.id]);
            Swal.fire('Album creado', `El album ${result.value} ha sido creado`, 'success');
          
        });
      }
  });
  }
}
