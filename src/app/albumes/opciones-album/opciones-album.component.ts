import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';

import { Album } from '../album/album';
import { AlbumService } from '../album/album.service';


@Component({
  selector: 'app-opciones-album',
  templateUrl: './opciones-album.component.html',
  styleUrls: ['./opciones-album.component.css']
})
export class OpcionesAlbumComponent implements OnInit {

  errores: string[];
  album: Album;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  editar(): void {
    
  }
}
