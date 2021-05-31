import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: Usuario=new Usuario();

  constructor(
  ) { }

  ngOnInit(): void {
    this.usuario=JSON.parse(sessionStorage.getItem("usuariologueado"));
    console.log(this.usuario);

  }

}
