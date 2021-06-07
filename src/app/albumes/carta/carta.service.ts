import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
        carta.name = response.name;
        carta.manaCost = response.manaCost;
        carta.convertedManaCost = response.convertedManaCost;
        carta.colors = response.colors;
        carta.setCode = response.setCode;
        carta.text = response.text;
      })
    );
  }

  getImagenesCarta(carta: Carta): Observable<any> {
    let url: string = "https://api.scryfall.com/cards";
    return this.http.get(`${url}/${carta.scryfallId}`).pipe(
      map((response: any) => {
        if (response.card_faces && response.card_faces[0].image_uris) {
          carta.imagenesCarta = response.card_faces[0].image_uris as Map<string, string>;
        } else {
          carta.imagenesCarta = response.image_uris as Map<string, string>;
        }
      })
    );
  }

  getByNombreGroupByOracle(nombre: string, page: number): Observable<any> {
    let url = this.url + "/mtgdb/carta/nombre";
    let params = new HttpParams().set("page", page.toString());
    return this.http.get(`${url}/${nombre}/oracle`, { params }).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }

  getByNombreGroupByIlust(nombre: string, page: number): Observable<any> {
    let url = this.url + "/mtgdb/carta/nombre";
    let params = new HttpParams().set("page", page.toString());
    return this.http.get(`${url}/${nombre}/ilust`, { params }).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }
  
  getByNombreGroupById(nombre: string, page: number): Observable<any> {
    let url = this.url + "/mtgdb/carta/nombre";
    let params = new HttpParams().set("page", page.toString());
    return this.http.get(`${url}/${nombre}`, { params }).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }

  getByOracleGroupByIlust(oracle_id: string, page: number): Observable<any> {
    let url = this.url + "/mtgdb/carta/oracle";
    let params = new HttpParams().set("page", page.toString());
    return this.http.get(`${url}/${oracle_id}/ilust`, { params }).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }

  getByIlustGroupById(ilust_id: string, page: number): Observable<any> {
    let url = this.url + "/mtgdb/carta/ilust";
    let params = new HttpParams().set("page", page.toString());
    return this.http.get(`${url}/${ilust_id}`, { params }).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }
}
