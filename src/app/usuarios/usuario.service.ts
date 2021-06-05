import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';

@Injectable()
export class UsuarioService {

  private url: string = "http://localhost:8080/collector";

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  public get usuario(): Usuario {
    if (sessionStorage.getItem('usuariologueado') != null) {
      return JSON.parse(sessionStorage.getItem('usuariologueado')) as Usuario;
    }
    return new Usuario();
  }

  guardarUsuario(usuario: Usuario): void {
    sessionStorage.setItem('usuariologueado', JSON.stringify(usuario));
  }

  logout(): void {
    sessionStorage.clear();
  }

  getUsuarios(pagina: number): Observable<any[]> {
    let url = this.url + "/usuarios/page";
    return this.http.get(url + "/" + pagina).pipe(
      map((response: any) => {
        console.log(response);
        (response.content as Usuario[]).map(usuario => {
          //usuario.email = usuario.email.toUpperCase();
          console.log(usuario);
          return usuario;
        });
        return response;
      })
    );
  }

  getUsuario(id): Observable<Usuario> {
    this.url = "http://localhost:8080/ecomove/v0.1/usuarios";
    return this.http.get<Usuario>(`${this.url}/${id}`).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        this.router.navigate(['/usuarios'])
        Swal.fire('Error al editar', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }

  getNumAlbumesUsuario(id: string): Observable<number> {
    let url = this.url + "/user";
    return this.http.get<number>(`${url}/${id}/albums/num`);
  }

  getUsuarioLogin(usuario: Usuario): Observable<any> {
    const urlEndpoint = this.url + "/usuarios/login";
    let params = new URLSearchParams();
    let password = Md5.hashStr(usuario.password)
    params.set('grant_type', 'password');
    params.set('user', usuario.username);
    params.set('pass', password);
    return this.http.post<any>(urlEndpoint + '?' + params.toString(), {});
  }

  update(username: string, usuario: Usuario): Observable<any> {
    let url = this.url + "/usuario";
    usuario.username = Md5.hashStr(usuario.password);

    return this.http.post<any>(`${url}/${username}`, usuario).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

  create(usuario: Usuario): Observable<Usuario> {
    let url = this.url + "/usuario";
    let params = new HttpParams()
      .set('username', usuario.username)
      .set('password', Md5.hashStr(usuario.password))
      .set('nombre', usuario.nombre)
      .set('email', usuario.email);

    return this.http.post(url, params).pipe(
      map((response: any) => response as Usuario),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

  delete(username: string): Observable<Usuario> {
    this.url = "http://localhost:8082/ecomove/v0.1/usuario";
    return this.http.delete<Usuario>(`${this.url}/${username}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

}
