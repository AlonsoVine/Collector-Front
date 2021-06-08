import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';
import { AlbumService } from '../album.service';


@Component({
  selector: 'app-opciones-album',
  templateUrl: './opciones-album.component.html',
  styleUrls: ['./opciones-album.component.css']
})
export class OpcionesAlbumComponent implements OnInit {

  errores: string[];
  passwordConfirmada: string;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  editar(): void {
    
  }
}
