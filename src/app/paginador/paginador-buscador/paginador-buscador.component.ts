import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Carta } from 'src/app/albumes/carta/carta';

@Component({
  selector: 'app-paginador-buscador',
  templateUrl: './paginador-buscador.component.html',
  styleUrls: ['./paginador-buscador.component.css']
})
export class PaginadorBuscadorComponent implements OnInit {

  @Input() paginador:any;

  @Input() carta: Carta;

  paginas: number[];

  desde:number;

  hasta:number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges){
    let paginadorActualizado=changes['paginador'];
    if(paginadorActualizado.previousValue){
      this.initPaginator();
    }
  }

  private initPaginator():void{
    this.desde=Math.min(Math.max(1,this.paginador.number-2),this.paginador.totalPages-5);
    this.hasta=Math.max(Math.min(this.paginador.totalPages,this.paginador.number+4),6);
    if(this.paginador.totalPages>5){
      this.paginas=new Array(this.hasta-this.desde+1).fill(0).map((_valor,indice)=>indice+this.desde);
    }else{
    this.paginas=new Array(this.paginador.totalPages).fill(0).map((_valor,indice)=>indice+1);
    }
  }

}
