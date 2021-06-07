import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

import { Album } from './album/album';
import { AlbumesService } from '../albumes/albumes.service';
import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario } from '../usuarios/usuario';

@Component({
  selector: 'app-form-album',
  templateUrl: './formalbum.component.html',
  styleUrls: ['./formalbum.component.css']
})
export class FormAlbumComponent implements OnInit {

  album: Album;
  usuario: Usuario;
  titulo: string = "CREAR ALBUM";
  errores: string[];

  constructor(
    private albumesService: AlbumesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
    this.album = new Album();
    this.cargarDatosAlbum();
  }


  cargarDatosAlbum(): void {/*
    this.activatedRoute.params.subscribe(params=>{
      let nombre = params['matricula'];
      if(nombre){
        this.vehiculoService.getVehiculo(matricula).subscribe((vehiculo)=>{
          this.album.matricula=vehiculo.matricula;
          
          console.log(this.album);
        });
      }
    })*/
    
  }

 

  addAlbum(): void {
    if(this.album.nombre == null){
      Swal.fire('Error creación de album', '¡Nombre vacio!', 'error');
      return;
    }
    console.log(this.album.nombre);
    this.albumesService.createAlbum(this.album.nombre, this.usuario.username).subscribe(
      (response) => {
        this.router.navigate(['album', response.id]);
        Swal.fire('Album creado', `El album ${this.album.nombre} ha sido creado`, 'success');
      
    });
  }


}
