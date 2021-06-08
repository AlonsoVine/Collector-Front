import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Carta } from './carta';
import { CartaService } from './carta.service';
import Swal from 'sweetalert2';
import { AlbumesService } from 'src/app/albumes/albumes.service';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { AlbumService } from '../albumes/album/album.service';
import { SimboloService } from './ediciones/edicion.service';
import { Simbolo } from './ediciones/edicion';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  id_carta: number;
  scryfall_id: string;
  carta_en_album: boolean;

  nombre_carta: string;
  carta: Carta;
  simbolo_carta: Simbolo;
  albumes: Map<string, string> = new Map<string, string>();

  constructor(
    private cartaService: CartaService,
    private albumesService: AlbumesService,
    private albumService: AlbumService,
    private usuarioService: UsuarioService,
    private simboloService: SimboloService,
    private activatedRoute: ActivatedRoute,

  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id_carta = parseInt(params.get('id'));
      this.scryfall_id = params.get('scid');
      this.carta_en_album = this.id_carta ? true : false;
      this.obtenerCarta();
      this.obtenerAlbumes();
    })
  }

  obtenerCarta(): void {
    this.carta = new Carta();
    this.carta.scryfallId = this.scryfall_id;
    this.cartaService.getCarta(this.carta).subscribe(() => {
      this.obtenerSimbolo();
    });
    this.cartaService.getImagenesCarta(this.carta).subscribe();
  }

  obtenerSimbolo(): void {
    this.simboloService.getSimbolo(this.carta.setCode).subscribe(response => {
      this.simbolo_carta = response as Simbolo;
    })
  }

  obtenerAlbumes() {
    this.albumesService.getAllAlbumes(this.usuarioService.usuario.username).subscribe(
      response => {
        for (let element of response) {
          console.log(element);
          this.albumes.set(element.id, element.nombre);
        }
      });
  }

  guardarCarta(): void {
    Swal.fire({
      title: 'Elige el album en el que guardarla',
      input: 'select',
      inputOptions: this.albumes,
      inputPlaceholder: this.albumes.values[0],
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== '') {
            resolve(null);
          } else {
            resolve('Debes seleccionar un album');
          }
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.albumService.putCartaInAlbum(this.carta, result.value).subscribe(() => {
          Swal.fire('Carta añadida', `La carta ${this.carta.name} ha sido añadida al album seleccionado correctamente`, 'success');
        });
      }
    });
  }
}
