import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';

import { Album } from '../album/album';
import { AlbumService } from '../album/album.service';
import { AlbumesService } from '../albumes.service';


@Component({
  selector: 'app-opciones-album',
  templateUrl: './opciones-album.component.html',
  styleUrls: ['./opciones-album.component.css']
})
export class OpcionesAlbumComponent implements OnInit {

  id_album: number;
  errores: string[];


  album: Album;
  albumEditado: Album;

  constructor(
    private albumesService: AlbumesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.albumEditado = new Album;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.id_album = +params.get('id');
      this.albumesService.getAlbum(this.id_album).subscribe(
        response => {
          this.album = response as Album;
        }
      );
    });
  }

  editar(): void {

    
  }
}
