import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

  private url : string = "http://localhost:8080/collector";
  private _usuario: Usuario;
  private _token: string;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuariologueado') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuariologueado')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
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
    params.set('grant_type', 'password');
    params.set('user', usuario.username);
    params.set('pass', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint + '?' + params.toString(), {});
  }

  update(username: string, usuario: Usuario): Observable<any> {
    let url = this.url + "/usuario";

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
    .set('password', usuario.password)
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

  guardarUsuario(usuario: Usuario): void {
    this._usuario = usuario;
    sessionStorage.setItem('usuariologueado', JSON.stringify(this._usuario));
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }

}
