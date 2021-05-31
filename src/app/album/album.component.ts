import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.obtenerCartas();
  }

  obtenerCartas(): void {
    this.albumService.getPaginaAlbum(this.id_album, this.pagina).subscribe(response => {
      (this.cartas = response.content as Carta[])
        .forEach(carta => {
          this.cartaService.getImagenesCarta(carta).subscribe()
        })
    })
  }



}
