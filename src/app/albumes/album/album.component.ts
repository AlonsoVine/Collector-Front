import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from './album';
import { AlbumesService } from '../albumes.service';
import { AlbumService } from './album.service';
import { Carta } from '../carta/carta';
import { CartaService } from '../carta/carta.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  
  album: Album;
  id_album: number;
  cartas: Carta[];
  paginador: any;
  cargando: boolean = true;

  constructor(
    private cartaService: CartaService,
    private albumService: AlbumService,
    private albumesService: AlbumesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let pagina = +params.get('page');
      if (!pagina) {
        pagina = 0;
      }

      this.id_album = +params.get('id');
      this.albumesService.getAlbum(this.id_album).subscribe(response => {
        this.album = response as Album;
      });

      this.obtenerCartas(pagina);
      
    })
  }

  getImagenes(carta: Carta) {
    this.cartaService.getImagenesCarta(carta).subscribe( () => {
      this.cargando = false;
    });
  }

  obtenerCartas(pagina: number): void {
    this.albumService.getPaginaAlbum(this.id_album, pagina).subscribe(response => {
      this.cartas = response.content as Carta[];
      this.cartas.forEach(carta => {
        this.cartaService.getCarta(carta).subscribe(() => {
          // Primero todos los textos y luego las imagenes:
          // getImagenes(carta)
        });
        // Primero imagenes y luego textos:
        this.getImagenes(carta);
      })
      this.paginador = response;
    })
  }

}
