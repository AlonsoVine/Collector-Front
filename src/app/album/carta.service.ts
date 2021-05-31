import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carta } from './carta';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CartaService {

  private url: string = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) { }

  getCarta(carta: Carta): Observable<any>{
    let url = this.url + "/mtgdb/carta";
    return this.http.get(`${url}/${carta.scryfallId}`).pipe(
      map((response: any) => {
        console.log(response);
        carta.id = response.id;
        carta.name = response.name;
        carta.manaCost = response.manaCost;
        carta.convertedManaCost = response.convertedManaCost;
        carta.colors = response.colors;
        carta.setCode = response.setCode;
      })
    );
  }

  getImagenesCarta(carta: Carta): Observable<any> {
    let url: string = "https://api.scryfall.com/cards";
    return this.http.get(`${url}/${carta.scryfallId}`).pipe(
      map((response: any) => {
        console.log(response);
        carta.imagenesCarta = response.image_uris as Map<string, string>
      })
    );
  }

  



}
