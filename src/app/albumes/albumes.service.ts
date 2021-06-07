import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from './album/album';

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

  getAllAlbumes(username: string): Observable<any> {
    let url = this.url + "/user";
    return this.http.get(`${url}/${username}/albums/all`).pipe(
      map((response: any) => {
        
        return response as Album[];
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

  createAlbum(nombreAlbum: string, username: string): Observable<any>{
    let url = this.url + "/album";
    console.log(nombreAlbum);
    let params = new HttpParams().set("nombre", nombreAlbum).set("usuario", username);
    
    console.log(params);
    return this.http.post(`${url}`, params).pipe(
      map((response: any) => {
        console.log(response);
        return response as Album;
      })
    );
  }
}
