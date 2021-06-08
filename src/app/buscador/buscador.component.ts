import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carta } from '../cartas/carta';
import { CartaService } from '../cartas/carta.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  cartasBusqueda: Carta[];
  textoBuscado: string;
  tipoBusqueda: string;
  paginador: any;
  pagina: number;

  cargando: boolean = false;

  constructor(
    private cartaService: CartaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pagina = +params.get('page');
      if (!this.pagina) {
        this.pagina = 0;
      }
      this.tipoBusqueda = params.get('tipo')
      if (!this.tipoBusqueda) {
        this.tipoBusqueda = "oracle";
      }
      this.textoBuscado = params.get('txt');
      if (this.textoBuscado) {
        this.getCartas();
      }
    });
  }

  buscar() {
    if (this.textoBuscado) {
      this.router.navigate(['buscar', this.tipoBusqueda, this.textoBuscado]);
    }
  }

  getCartas() {
    this.cargando = true;
    if (this.tipoBusqueda == "oracle") {
      this.getByNombreGroupByOracle();
    } else if (this.tipoBusqueda == "ilust") {
      this.getByNombreGroupByIlust();
    } else if (this.tipoBusqueda == "all") {
      this.getByNombreGroupById();
    }
  }

  getImagenes () {
    this.cartasBusqueda.forEach(carta => {
      this.cartaService.getImagenesCarta(carta).subscribe( () => {
        this.cargando = false;
      });
    });
  }

  getByNombreGroupByOracle () {
    this.cartaService.getByNombreGroupByOracle(this.textoBuscado, this.pagina).subscribe(
      response => {
        this.cartasBusqueda = response.content as Carta[];
        this.paginador = response;
        this.getImagenes();
      }
    );
  }

  getByNombreGroupByIlust () {
    this.cartaService.getByNombreGroupByIlust(this.textoBuscado, this.pagina).subscribe(
      response => {
        this.cartasBusqueda = response.content as Carta[];
        this.paginador = response;
        this.getImagenes();
      }
    );
  }

  getByNombreGroupById () {
    this.cartaService.getByNombreGroupById(this.textoBuscado, this.pagina).subscribe(
      response => {
        this.cartasBusqueda = response.content as Carta[];
        this.paginador = response;
        this.getImagenes();
      }
    );
  }
}
