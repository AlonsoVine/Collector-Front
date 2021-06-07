import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carta } from '../carta/carta';

@Injectable()
export class AlbumService {

  private url: string;
  constructor(
    private http: HttpClient
  ) { }

  getPaginaAlbum(id:number, page: number): Observable<any>{
    this.url = "http://localhost:8080/collector/album";
    let params = new HttpParams().set("page", page.toString());
    return this.http.get(`${this.url}/${id}/${page}`,{params:params}).pipe(
      map((response: any) => {
        (response.content as Carta[]).map(carta => {
          return carta;
        });
        return response;
      }
      )
    );
  }

  putCartaInAlbum (carta: Carta, id_album: number): Observable<any> {
    let url = "http://localhost:8080/collector/album";
    let params = new HttpParams().set("carta", carta.scryfallId);
    return this.http.put(`${url}/${id_album}`, params);
  }
}