import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from './album';

@Injectable()
export class AlbumesService {

  private url: string;
  constructor(
    private http: HttpClient
  ) { }

  getAlbumes(username:string, page: string): Observable<any>{
    this.url = "http://localhost:8080/collector/user";
    let params = new HttpParams().set("page", page);
    return this.http.get(`${this.url}/${username}/albums`,{params:params}).pipe(
      map((response: any) => {
        (response.content as Album[]).map(album => {
          return album;
        });
        return response;
      }
      )
    );
  }

  getPagina(id: string, page: string): Observable<any>{
    this.url = "http://localhost:8080/collector/album";
    return this.http.get(`${this.url}/${id}/${page}`).pipe(
      map((response: any) => {
        (response.content.externalId as string[]).map(carta => {
          return carta;
        });
        return response;
      })
    );
  }



}
