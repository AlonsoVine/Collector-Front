import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from './album';

@Injectable()
export class AlbumesService {

  private url: string = "http://localhost:8080/collector";
  constructor(
    private http: HttpClient
  ) { }

  getAlbumes(username: string, page: string): Observable<any> {
    let url = this.url + "/user";
    let params = new HttpParams().set("page", page);
    return this.http.get(`${url}/${username}/albums`, { params: params }).pipe(
      map((response: any) => {
        (response.content as Album[]).map(album => {
          return album;
        });
        return response;
      }
      )
    );
  }

  getAlbum(id: number):Observable<any>{
    let url = this.url + "/album";
    return this.http.get(`${url}/${id}`).pipe(
      map((response: any) => {
        return response as Album;
      })
    )

  }



  /*getPagina(id: string, page: string): Observable<any> {
    this.url = "http://localhost:8080/collector/album";
    return this.http.get(`${this.url}/${id}/${page}`).pipe(
      map((response: any) => {
        (response.content.externalId as string[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }*/

  createAlbum(nombreAlbum: string, username: string): Observable<any>{
    this.url = "http://localhost:8080/collector/album";
    console.log(nombreAlbum);
    let params = new HttpParams().set("nombre", nombreAlbum).set("usuario", username);
    
    console.log(params);
    return this.http.post(`${this.url}`, params).pipe(
      map((response: any) => {
        console.log(response);
        return response as Album;
      })
    );
  }



}
