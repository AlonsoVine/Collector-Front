import { Component, OnInit } from '@angular/core';
import { Usuario } from "../usuarios/usuario";
import { UsuarioService } from '../usuarios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
2