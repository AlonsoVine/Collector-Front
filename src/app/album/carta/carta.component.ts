import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Carta } from '../carta';
import { CartaService } from '../carta.service';

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

  constructor(
    private cartaService: CartaService,
    private activatedRoute: ActivatedRoute
    ) {
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.id_carta = +params.get('id');
      this.scryfall_id = params.get('scid');
      this.carta_en_album = this.id_carta ? true : false;
      this.obtenerCarta();
    })
  }

  obtenerCarta(): void {
    this.carta = new Carta();
    this.carta.scryfallId = this.scryfall_id;
    this.cartaService.getCarta(this.carta).subscribe();
    this.cartaService.getImagenesCarta(this.carta).subscribe();


  }
}
