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

  getCarta(carta: Carta): Observable<any> {
    let url = this.url + "/mtgdb/carta";
    return this.http.get(`${url}/${carta.scryfallId}`).pipe(
      map((response: any) => {
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
        carta.imagenesCarta = response.image_uris as Map<string, string>
      })
    );
  }

  getByNombreGroupByOracle(nombre: string): Observable<any> {
    let url = this.url + "/mtgdb/carta/nombre";
    return this.http.get(`${url}/${nombre}/oracle`).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }

  getByNombreGroupByIlust(nombre: string): Observable<any> {
    let url = this.url + "/mtgdb/carta/nombre";
    return this.http.get(`${url}/${nombre}/ilust`).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }
  
  getByNombreGroupById(nombre: string): Observable<any> {
    let url = this.url + "/mtgdb/carta/nombre";
    return this.http.get(`${url}/${nombre}`).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }

  getByOracleGroupByIlust(oracle_id: string): Observable<any> {
    let url = this.url + "/mtgdb/carta/oracle";
    return this.http.get(`${url}/${oracle_id}/ilust`).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }

  getByIlustGroupById(ilust_id: string): Observable<any> {
    let url = this.url + "/mtgdb/carta/ilust";
    return this.http.get(`${url}/${ilust_id}`).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }
}
