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

      
    })

  }



}
