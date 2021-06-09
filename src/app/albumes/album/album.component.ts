import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from './album';
import { AlbumesService } from '../albumes.service';
import { AlbumService } from './album.service';
import { Carta } from '../../cartas/carta';
import { CartaService } from '../../cartas/carta.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  
  album: Album;
  tam_fila: number = 4;
  pag_filas: number = 3;
  id_album: number;
  cartas: Carta[];
  paginador: any;
  pagina: number;
  cargando: boolean = true;

  constructor(
    private cartaService: CartaService,
    private albumService: AlbumService,
    private albumesService: AlbumesService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pagina = +params.get('page');
      if (!this.pagina) {
        this.pagina = 0;
      }

      if (localStorage.getItem('tam_fila') != null) {
        this.tam_fila = +localStorage.getItem('tam_fila');
      }
      this.id_album = +params.get('id');
      this.albumesService.getAlbum(this.id_album).subscribe(response => {
        this.album = response as Album;
      });

      this.obtenerCartas(this.pagina);
      
    })
  }

  getImagenes(carta: Carta) {
    this.cartaService.getImagenesCarta(carta).subscribe( () => {
      this.cargando = false;
    });
  }

  recargar (num: number) {
    this.tam_fila = this.tam_fila + num;
    this.pagina = 0;
    localStorage.setItem('tam_fila', this.tam_fila.toString());
    this.ref.detectChanges();
    if (num > 0 && this.paginador.last) {
      this.router.navigate(['/album', this.album.id, 'page', this.pagina])
    }
    this.obtenerCartas(this.pagina);
  }

  obtenerCartas(pagina: number): void {
    this.albumService.getPaginaAlbum(this.id_album, pagina, this.tam_fila * 3).subscribe(response => {
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
