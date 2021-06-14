import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carta } from '../../cartas/carta';
import { Album } from './album';

@Injectable()
export class AlbumService {

  private url: string = "http://localhost:8080/collector";
  constructor(
    private http: HttpClient
  ) { }

  getPaginaAlbum(id:number, page: number, size:number): Observable<any>{
    let url = this.url + "/album";
    let params = new HttpParams().set("page", page.toString()).set("size", size.toString());

    return this.http.get(`${url}/${id}/${page}`,{params:params}).pipe(
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
    let url = this.url +  "/album";
    let params = new HttpParams().set("carta", carta.scryfallId);
    return this.http.put(`${url}/${id_album}`, params);
  }

  deleteCarta (carta: Carta): Observable<any> {
    let url = this.url +  "/album";
    alert("A");
    let params = new HttpParams().set("carta", carta.id.toString());
    return this.http.delete(`${url}`, { params });
  }

  update(id: string, nombre: string): Observable<any>{
    let url  =  this.url + "/album";
    let params = new HttpParams().set("id", id).set("nombre", nombre);
    return this.http.put<any>(`${url}`, params).pipe( 
      map ((response: any) => {
        return response as Album;
      }
    ));
  }



  delete(){

  }
}