import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Simbolo } from './simbolo';

@Injectable()
export class SimboloService {

  private url: string = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) { }

  getSimbolo(set_code: string): Observable<any> {
    let url = "https://api.scryfall.com/sets";
    return this.http.get(`${url}/${set_code}`).pipe(
      map((response: any) => {
       return response as Simbolo;
      })
    );
  }
}