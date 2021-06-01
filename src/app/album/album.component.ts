import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from './album.service';
import { Carta } from './carta';
import { CartaService } from './carta.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  id_album: number;
  pagina: number;
  cartas: Carta[];

  constructor(
    private cartaService: CartaService,
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.pagina = +params.get('page');
      if (!this.pagina) {
        this.pagina = 0;
      }

      this.id_album = +params.get('id')

      this.obtenerCartas();
    })
  }

  obtenerCartas(): void {
    this.albumService.getPaginaAlbum(this.id_album, this.pagina).subscribe(response => {
      this.cartas = response.content as Carta[];
      this.cartas.forEach(carta => {
        this.cartaService.getCarta(carta).subscribe(() => {
          // Primero todos los textos y luego todas las imagenes
          this.cartaService.getImagenesCarta(carta).subscribe();
        });
        // Imagen y texto de una en una
        // this.cartaService.getImagenesCarta(carta).subscribe();
      })
    })
  }

}
