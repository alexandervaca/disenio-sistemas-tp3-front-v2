import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ParametriaResponse } from '../modelo/parametriaResponse';
import { ParametriaLegajo } from '../modelo/parametriaLegajo';
import { Parametria } from '../modelo/parametria';
import { Producto } from '../modelo/producto';
import { TipoProductoEnum } from '../modelo/tipoProductoEnum';

@Injectable({
  providedIn: 'root'
})
export class ParametriaService {

  private access_token = environment.TOKEN;

  constructor(protected http : HttpClient) { }

  public test() : Promise<ParametriaResponse> {
    return new Promise((resolve, reject) =>{

      this.http.get(environment.API_ENDPOINT + '/test', {responseType: 'json'})
        .subscribe((response: ParametriaResponse) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public guardarParametriaLegajo(parametriaLegajo: ParametriaLegajo) : Promise<ParametriaResponse> {
    parametriaLegajo.parametrias.forEach( (param => {
      param.productos = param.productos.filter( (prod) => prod.rama != '' && prod.codigoProducto != '' && 
        prod.codigoProductoGaus != '' && prod.sumaAsegurada && prod.descripcion && prod.seleccionado);
    }));

    // Si no selecciono un banner landing, setea uno por default
    if (!parametriaLegajo.pathJuntos) {
      parametriaLegajo.juntos = true;
      parametriaLegajo.pathJuntos = 'banner_landing_defult_1960x350.jpg';
    }

    let body = {
      id: parametriaLegajo.id,
      numeroLegajo: parametriaLegajo.numeroLegajo,

      logoBBVA: parametriaLegajo.logoBBVA,
      pathLogo: 'logo_bbva_default.png',// logo bbva default

      alianza: parametriaLegajo.alianza,
      pathAlianza: parametriaLegajo.pathAlianza,

      logoNinguno: parametriaLegajo.logoNinguno,

      logoBBVABroker: parametriaLegajo.logoBBVABroker,
      pathBBVABroker: 'logo_bbva_broker_default.png',// logo broker default

      logoOtro: parametriaLegajo.logoOtro,
      pathLogoOtro: parametriaLegajo.pathLogoOtro,

      juntos: parametriaLegajo.juntos,
      pathJuntos: parametriaLegajo.pathJuntos,

      parametrias: parametriaLegajo.parametrias,
    };

    return new Promise((resolve, reject) =>{

      this.http.post(environment.API_ENDPOINT + '/parametria/guardarParametriaLegajo.do?access_token=' + this.access_token, body)
        .subscribe((response: ParametriaResponse) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public obtenerParametriaPorLegajo(legajo: string) : Promise<ParametriaResponse> {
    return new Promise((resolve, reject) =>{

      this.http.get(environment.API_ENDPOINT + '/parametria/obtenerParametriaPorLegajo.do?access_token=' + this.access_token + 
      '&legajo=' + legajo, {responseType: 'json'})
        .subscribe((response: ParametriaResponse) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  private buildProductosVacio() : Producto[] {
    let productos: Producto[] = [];
    productos.push(new Producto());
    productos.push(new Producto());
    productos.push(new Producto());
    return productos;
  }

  public buildParametriaVacia() : ParametriaLegajo {
    let paramVacia : ParametriaLegajo = new ParametriaLegajo();
    paramVacia.id = null;
    paramVacia.numeroLegajo = '';

    paramVacia.logoBBVA = false;
    paramVacia.pathLogo = '';

    paramVacia.alianza = false;
    paramVacia.pathAlianza = '';

    paramVacia.logoNinguno = false;

    paramVacia.logoBBVABroker = false;
    paramVacia.pathBBVABroker = '';

    paramVacia.logoOtro = false;
    paramVacia.pathLogoOtro = '';

    paramVacia.juntos = false;
    paramVacia.pathJuntos = '';


    let paramNotebook = new Parametria(this.buildProductosVacio());
    paramNotebook.orden = '';
    paramNotebook.tipoCobertura = TipoProductoEnum.NOTEBOOK;
    paramNotebook.descripcionProducto = 'Notebook';
    paramNotebook.habilitado = false;
    paramNotebook.pathBanner = '';
    paramVacia.parametrias.push(paramNotebook);

    let paramCelular = new Parametria(this.buildProductosVacio());
    paramCelular.orden = '';
    paramCelular.tipoCobertura = TipoProductoEnum.CELULAR;
    paramCelular.descripcionProducto = 'Celular';
    paramCelular.habilitado = false;
    paramCelular.pathBanner = '';
    paramVacia.parametrias.push(paramCelular);

    let paramTecno = new Parametria(this.buildProductosVacio());
    paramTecno.orden = '';
    paramTecno.tipoCobertura = TipoProductoEnum.TECNO_PORTATIL;
    paramTecno.descripcionProducto = 'Tecnologia Portatil';
    paramTecno.habilitado = false;
    paramTecno.pathBanner = '';
    paramVacia.parametrias.push(paramTecno);

    let paramHogar = new Parametria(this.buildProductosVacio());
    paramHogar.orden = '';
    paramHogar.tipoCobertura = TipoProductoEnum.HOGAR;
    paramHogar.descripcionProducto = 'Hogar';
    paramHogar.habilitado = false;
    paramHogar.pathBanner = '';
    paramVacia.parametrias.push(paramHogar);

    let paramBici = new Parametria(this.buildProductosVacio());
    paramBici.orden = '';
    paramBici.tipoCobertura = TipoProductoEnum.BICICLETAS;
    paramBici.descripcionProducto = 'Bicicletas';
    paramBici.habilitado = false;
    paramBici.pathBanner = '';
    paramVacia.parametrias.push(paramBici);

    return paramVacia;
  }
}
