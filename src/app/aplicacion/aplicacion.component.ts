import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../shared/services/usuario.service';
import { ParametriaService } from '../../shared/services/parametria.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {

  public mensajeError: string;

  public searching: boolean;
  public searchText: string;
  
  public legajosPersona = [];
  public legajoSelected: string;

  constructor(protected usuarioService : UsuariosService, protected parametriaService : ParametriaService) { }

  ngOnInit() {
    this.legajoSelected = '';
  }

  public selectLegajo(event: any) {

    
  }

  public guardarParametriaLegajo() {
    
  }

}
