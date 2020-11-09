import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../shared/services/usuario.service';
import { ParametriaService } from '../../shared/services/parametria.service';
import { ParametriaResponse } from '../modelo/parametriaResponse';
import { ParametriaLegajo } from '../modelo/parametriaLegajo';
import { Parametria } from '../modelo/parametria';
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

  public tipoCoberturaModal: string = '';
  public parametriaModal: Parametria;
  public parametriaLegajo: ParametriaLegajo;
  public previsualizarParametria: boolean;
  public mensajeArchivoResponse: string;

  constructor(protected usuarioService : UsuariosService, protected parametriaService : ParametriaService) { }

  ngOnInit() {
    this.legajoSelected = '';
    this.parametriaLegajo = this.parametriaService.buildParametriaVacia();
  }

  public selectLegajo(event: any) {

    this.parametriaLegajo = this.parametriaService.buildParametriaVacia();

    this.legajoSelected = event.target.value;
    if (this.legajoSelected) {
      this.parametriaService.obtenerParametriaPorLegajo(this.legajoSelected).then((response: ParametriaResponse) => {
        if (response.estado['codigo'] == 0) {

          this.parametriaLegajo.id = response.parametriaLegajo.id;
          this.parametriaLegajo.numeroLegajo = response.parametriaLegajo.numeroLegajo == null ? this.legajoSelected : response.parametriaLegajo.numeroLegajo;

          // Logo margen superior izquierdo
          this.parametriaLegajo.logoBBVA = response.parametriaLegajo.logoBBVA;
          this.parametriaLegajo.pathLogo = '';

          this.parametriaLegajo.logoNinguno = response.parametriaLegajo.logoNinguno;

          this.parametriaLegajo.logoBBVABroker = response.parametriaLegajo.logoBBVABroker;
          this.parametriaLegajo.pathBBVABroker = response.parametriaLegajo.pathBBVABroker;

          this.parametriaLegajo.logoOtro = response.parametriaLegajo.logoOtro;
          this.parametriaLegajo.pathLogoOtro = response.parametriaLegajo.pathLogoOtro;

          // Logo margen superior derecho
          this.parametriaLegajo.alianza = response.parametriaLegajo.alianza;
          this.parametriaLegajo.pathAlianza = response.parametriaLegajo.pathAlianza;

          this.parametriaLegajo.juntos = response.parametriaLegajo.juntos;
          this.parametriaLegajo.pathJuntos = response.parametriaLegajo.pathJuntos;

          this.parametriaLegajo.urlJuntos = response.parametriaLegajo.urlJuntos;
          // Setea por default parametrias vacias
          let paramVacia = this.parametriaService.buildParametriaVacia();
          this.parametriaLegajo.parametrias = paramVacia.parametrias;

        } else {
          console.log('error al recuperar el resultado');
          this.parametriaLegajo = this.parametriaService.buildParametriaVacia();
        }
      });
    }
  }

  public guardarParametriaLegajo() {
    this.parametriaService.guardarParametriaLegajo(this.parametriaLegajo).then((respuesta: ParametriaResponse) => {
      if (respuesta.estado['codigo'] == 0) {
        this.parametriaLegajo = respuesta.parametriaLegajo;
      }
    });
  }

}
