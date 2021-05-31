import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import localeES from '@angular/common/locales/es';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariodetalleComponent } from './usuarios/usuariodetalle.component';
import { FormComponent } from './usuarios/form.component';
import { LoginComponent } from './usuarios/login.component';
import { EditarPerfilComponent } from './usuarios/editarperfil.component';
import { UsuarioService } from './usuarios/usuario.service';

import { AlbumesComponent } from './albumes/albumes.component';
import { AlbumesService } from './albumes/albumes.service';
import { AlbumComponent } from './album/album.component';
import { AlbumService } from './album/album.service';
import { CartaService } from './album/carta.service';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/usuarios/login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'home', component: HomeComponent, },
  { path: 'usuarios', component: UsuariosComponent, },
  { path: 'usuarios/pg/:pagina', component: UsuariosComponent },
  { path: 'crearCuenta', component: FormComponent },
  { path: 'usuarios/form/:id', component: FormComponent },
  { path: 'usuarios/login', component: LoginComponent },
  { path: 'albumes', component: AlbumesComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'perfil', component: UsuariodetalleComponent},
  { path: 'editarPerfil', component: EditarPerfilComponent},
  { path: 'albumes', component: AlbumesComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    UsuariosComponent,
    UsuariodetalleComponent,
    EditarPerfilComponent,
    FormComponent,
    HomeComponent,
    LoginComponent,
    AlbumesComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatProgressBarModule
  ],
  providers: [
    UsuarioService,
    FormComponent,
    AlbumesService,
    AlbumService,
    CartaService,
    UsuariodetalleComponent,
    EditarPerfilComponent,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
