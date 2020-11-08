import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuario.service';
import { ProductosService } from '../services/producto.service';
import { ParametriaService } from '../services/parametria.service';
import { ArchivoService } from '../services/archivo.service';
import { LegajosResponse } from '../modelo/legajosResponse';
import { ParametriaResponse } from '../modelo/parametriaResponse';
import { TipoProductoEnum } from '../modelo/tipoProductoEnum';
import { ParametriaLegajo } from '../modelo/parametriaLegajo';
import { Parametria } from '../modelo/parametria';
import { Producto } from '../modelo/producto';
import { ArchivoResponse } from '../modelo/archivoResponse';
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

  public orden = [1,2,3,4,5];

  public productosNotebook: Producto[] = [];
  public productosCelular: Producto[] = [];
  public productosPortatil: Producto[] = [];

  // Se usa para mostrar los productos en el modal
  public productosModal: Producto[] = [];
  // Tipo Cobertura a mostrar en el modal de productos a agregar
  public tipoCoberturaModal: string = '';
  // Parametria de la cual se muestran los productos en el modal de seleccion de productos
  public parametriaModal: Parametria;

  // Esta clase guarda la parametria
  public parametriaLegajo: ParametriaLegajo;

  public previsualizarParametria: boolean;
  public previsualizarCobertura: boolean;
  public parametriaPreVisualizada: Parametria;
  public previsualizarImagen: any;

  public currentBannerUpload: File;
  public mensajeArchivoResponse: string;

  public currentFileLandingUpload: File;
  public parametriaLegajoLogoIzquierdo: Blob;
  public parametriaLegajoLogoDerecho: Blob;
  public parametriaLegajoBannerLanding: Blob;
  public parametriasBanner = [[]];

  public currentFileLogoOtroUpload: File;
  public currentFileLogoPASUpload: File;

  constructor(protected usuarioService : UsuariosService, protected productoService : ProductosService,
    protected parametriaService : ParametriaService, protected archivoService : ArchivoService) { }

  ngOnInit() {
    this.limpiarModal();
    this.legajoSelected = '';
    // Se debe inicializar con una parametria vacia
    this.parametriaLegajo = this.parametriaService.buildParametriaVacia();

    //this.login();

    this.usuarioService.login();
    /*this.productoService.buscarProducto(TipoProductoEnum.NOTEBOOK).then((data: any) => {
      this.productosNotebook = data['tiposProducto'];
    });
  
    this.productoService.buscarProducto(TipoProductoEnum.CELULAR).then((data: any) => {
      this.productosCelular = data['tiposProducto'];
    });

    this.productoService.buscarProducto(TipoProductoEnum.TECNO_PORTATIL).then((data: any) => {
      this.productosPortatil = data['tiposProducto'];
    });

    this.parametriasBanner['NBK'] = null;
    this.parametriasBanner['POR'] = null;
    this.parametriasBanner['TEC'] = null;
    this.parametriasBanner['HOG'] = null;
    this.parametriasBanner['BIC'] = null;*/
  }

  public login() {
    this.usuarioService.login().then((data: any) => {
      console.log(data);
      let tokenLogin = data.value;
      console.log(tokenLogin);
    });
  }

  /**
  * Muestra el resultado de la busqueda
  * @function buscarLegajosPersona
  * @param {any} event
  * @return {void}
  */
 public buscarLegajosPersona(event: any) {
    if (event.target.value.length >= 4) {
      this.searching = true;
      this.searchText = event.target.value;

      this.usuarioService.buscarLegajosPersona(this.searchText.toLocaleUpperCase()).then((respuesta: LegajosResponse) => {
        if (respuesta.estado['codigo'] == 0) {
          this.legajosPersona = respuesta.legajosPersona;
        } else {
          console.log('error al recuperar el resultado');
          this.legajosPersona = [];
        }
      });
    } else {
      this.searching = false;
    }
  }

  public selectLegajo(event: any) {
    this.limpiarModal();

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

          this.parametriaLegajo.parametrias.forEach( parametriaVacia => {
            // Obtengo las parametrias obtenidas para el legajo
            if (response.parametriaLegajo.parametrias.length > 0) {
              response.parametriaLegajo.parametrias.forEach( paramResponse => {
                if (parametriaVacia.tipoCobertura == paramResponse.tipoCobertura) {
                  parametriaVacia.id = paramResponse.id;
                  
                  parametriaVacia.orden = paramResponse.orden;
                  parametriaVacia.descripcionProducto = paramResponse.descripcionProducto;
                  parametriaVacia.habilitado = paramResponse.habilitado;
                  parametriaVacia.tipoCobertura = paramResponse.tipoCobertura;
                  parametriaVacia.pathBanner = paramResponse.pathBanner;
                  parametriaVacia.url = paramResponse.url;
                  parametriaVacia.descripcionTodos = paramResponse.descripcionTodos;
                  parametriaVacia.productos = paramResponse.productos;
                }
              });
            }
          });
        } else {
          console.log('error al recuperar el resultado');
          this.parametriaLegajo = this.parametriaService.buildParametriaVacia();
        }
      });
    }
  }

  public buscarProducto(tipoProducto: string) {
    this.productoService.buscarProducto(tipoProducto);
  }

  public parametriasHabilitadas(parametrias: Parametria[]): Parametria[] {
    let parametriasAux: Parametria[] = parametrias.filter( (param: Parametria) => param.habilitado == true);
    return parametriasAux;
  }

  public visualizarParametria(id: string) {
    this.previsualizarParametria = true;

    // Obtiene logo margen superior izquierdo
    let nombreLogoIzquierdo = '';
    /*if (this.parametriaLegajo.logoBBVABroker) {
      nombreLogoIzquierdo = this.parametriaLegajo.pathBBVABroker;
    }*/
    if (this.parametriaLegajo.logoOtro) {
      nombreLogoIzquierdo = this.parametriaLegajo.pathLogoOtro;
    }
    // Si tiene que buscar un logo diferente al default de BBVA, busca la imagen del mismo
    if (!this.parametriaLegajo.logoNinguno && nombreLogoIzquierdo != '') {
      this.archivoService.obtenerImagen(nombreLogoIzquierdo, '', this.legajoSelected, false).then((response: ArchivoResponse) => {
        this.parametriaLegajoLogoIzquierdo = response.imagen;
      });
    }

    // Obtiene logo margen superior derecho
    if (this.parametriaLegajo.alianza) {
      this.archivoService.obtenerImagen(this.parametriaLegajo.pathAlianza, '', this.legajoSelected, false).then((response: ArchivoResponse) => {
        this.parametriaLegajoLogoDerecho = response.imagen;
      });
    }
  
    // Obtiene el banner landing
    // Se envia el campo 'tipoCobertura' vacio para que solo busque el banner landing
    this.archivoService.obtenerImagen(this.parametriaLegajo.pathJuntos, '', this.legajoSelected, this.parametriaLegajo.juntos).then((response: ArchivoResponse) => {
      this.parametriaLegajoBannerLanding = response.imagen;
    });

    // Obtiene el banner de cada parametria
    this.parametriaLegajo.parametrias.forEach( param => {
      this.archivoService.obtenerImagen(param.pathBanner, param.tipoCobertura, this.legajoSelected, false).then((response: ArchivoResponse) => {
        this.parametriasBanner[param.tipoCobertura] = response.imagen;
      });
    });
  }

  public cerrarPrevisualizacionParametria() {
    this.previsualizarParametria = false;
    this.parametriaLegajoBannerLanding = null;
    this.parametriasBanner['NBK'] = null;
    this.parametriasBanner['POR'] = null;
    this.parametriasBanner['TEC'] = null;
    this.parametriasBanner['HOG'] = null;
    this.parametriasBanner['BIC'] = null;
  }

  public visualizarCobertura(id: string, parametria: Parametria) {
    this.archivoService.obtenerImagen(parametria.pathBanner, parametria.tipoCobertura, this.legajoSelected).then((response: ArchivoResponse) => {
      this.previsualizarCobertura = true;
      this.parametriaPreVisualizada = parametria;
      this.previsualizarImagen = response.imagen;
    });
  }

  public cerrarPrevisualizacionCobertura() {
    this.previsualizarCobertura = false;
    this.parametriaPreVisualizada = null;
    this.previsualizarImagen = null;
  }

  public mostrarProducto(parametria: Parametria, productos: Producto[]) {
    this.limpiarModal();
    this.tipoCoberturaModal = parametria.tipoCobertura;
    this.parametriaModal = parametria;

    switch (parametria.tipoCobertura) {
      case "NBK":
        this.productosModal = this.productosNotebook;
        break;
      case "POR":
        this.productosModal = this.productosCelular;
        break;
      case "TEC":
        this.productosModal = this.productosPortatil;
        break;
      case "HOG":
        this.productosModal = [];
        break;
      case "BIC":
        this.productosModal = [];
        break;
      default:
        this.productosModal = [];
    }

    // Itera los productos para setear el checkbox de los seleccionados
    let descripcionTodos: string = '';
    this.productosModal.forEach( prod => {
      productos.forEach( prod2 => {
        if (prod.codigoProductoGaus == prod2.codigoProductoGaus) {
          prod.seleccionado = prod2.seleccionado;
          if (prod.seleccionado) {
            descripcionTodos += prod2.descripcion + ' ' + prod2.sumaAsegurada + ' | ';
          }
        }
      });
    });
    // Actualiza la descripcion de los productos seleccionados
    parametria.descripcionTodos = descripcionTodos;
  }

  public seleccionarProducto(productoSeleccinado: Producto) {
    this.productosModal.forEach( prod => {
      if (prod.codigoProductoGaus == productoSeleccinado.codigoProductoGaus) {
        prod.seleccionado = true;
      }
    });
  }

  public agregarProductosSeleccionados(tipoCoberturaModal: string) {
    console.log('agregarProductosSeleccionados');
    console.log(this.productosModal);
    this.mensajeError = '';

    // Filtra las parametrias por el tipo de cobertura
    let parametriasAux: Parametria[] = this.parametriaLegajo.parametrias.filter( (param: Parametria) => param.tipoCobertura == tipoCoberturaModal);
    let parametriaAux: Parametria;
    if (parametriasAux) {
      parametriaAux = parametriasAux[0];
    }

    this.productosModal.forEach( prod => {
      // Valida que los productos ya agregados y seleccionados sean igual o menor a 3
      if (parametriaAux.productos && parametriaAux.productos.filter( (prod: Producto) => prod.seleccionado == true).length <= 3) {

        // Busca el producto en la parametria
        let productosParametriaLegajo: Producto[] = parametriaAux.productos.filter( (prodAux: Producto) => prod.codigoProductoGaus == prodAux.codigoProductoGaus);
        // Si encuentra el producto, setea el valor del checkbox
        let prodAux: Producto;
        if (productosParametriaLegajo) {
          prodAux = productosParametriaLegajo[0];
        }
        if (prodAux) {
          prodAux.seleccionado = prod.seleccionado;
        } else {
          // Sino, valida si esta seleccionado y lo agrega
          if (prod.seleccionado) {
            parametriaAux.productos.push(prod);
          }
        }
      } else {
        this.mensajeError = 'No se pueden agregar mas de tres productos.';
      }
    });

    // Actualiza la descripcion de todos los productos de la parametria
    let productosSeleccionados = this.parametriaModal.productos.filter( (prod) => prod.seleccionado == true);
    this.parametriaModal.descripcionTodos = '';
    productosSeleccionados.forEach( (prod: Producto) => {
      this.parametriaModal.descripcionTodos += prod.descripcion + ' ' + prod.sumaAsegurada + ' | ';
    });
    console.log(this.productosModal);
  }

  /**
   * Invoca al servicio rest para guardar la parametria del legajo seleccionado
   */
  public guardarParametriaLegajo() {
    this.parametriaService.guardarParametriaLegajo(this.parametriaLegajo).then((respuesta: ParametriaResponse) => {
      if (respuesta.estado['codigo'] == 0) {
        this.parametriaLegajo = respuesta.parametriaLegajo;
      }
    });
  }

  public subirBanner(tipoCobetura: string) {
    if (this.currentBannerUpload) {
      this.archivoService.subirBanner(this.currentBannerUpload, tipoCobetura, this.legajoSelected).then((respuesta: ArchivoResponse) => {
        if (respuesta.estado['codigo'] == 0) {
          this.mensajeArchivoResponse = 'Archivo subido correctamente';
          
          let nombreImagen = respuesta.nombreImagen;
          // Se debe buscar el tipoCobertura y modificar el pathBanner por 'nombreImagen'
          this.parametriaLegajo.parametrias.forEach(parametria => {
            if (parametria.tipoCobertura == tipoCobetura) {
              parametria.pathBanner = nombreImagen;
            }
          });
        }
      });
    }
  }

  public subirBannerLanding() {
    if (this.currentFileLandingUpload) {
      this.archivoService.subirBannerLanding(this.currentFileLandingUpload, this.legajoSelected).then((respuesta: ArchivoResponse) => {
        if (respuesta.estado['codigo'] == 0) {
          this.mensajeArchivoResponse = 'Archivo subido correctamente';

          this.parametriaLegajo.pathJuntos = respuesta.nombreImagen;
        }
      });
    }
  }

  public subirLogoOtro() {
    if (this.currentFileLogoOtroUpload) {
      this.archivoService.subirLogoOtro(this.currentFileLogoOtroUpload, this.legajoSelected).then((respuesta: ArchivoResponse) => {
        if (respuesta.estado['codigo'] == 0) {
          this.mensajeArchivoResponse = 'Archivo subido correctamente';

          this.parametriaLegajo.pathLogoOtro = respuesta.nombreImagen;
        }
      });
    }
  }

  public subirLogoPAS() {
    if (this.currentFileLogoPASUpload) {
      this.archivoService.subirLogoPAS(this.currentFileLogoPASUpload, this.legajoSelected).then((respuesta: ArchivoResponse) => {
        if (respuesta.estado['codigo'] == 0) {
          this.mensajeArchivoResponse = 'Archivo subido correctamente';

          this.parametriaLegajo.pathLogoOtro = respuesta.nombreImagen;
        }
      });
    }
  }

  public productosSeleccionados(productos: Producto[]): Producto[] {
    let productosAux = [];
    productos.forEach( (prod => {
      if (prod.seleccionado) {
        productosAux.push(prod);
      }
    }));
    return productosAux;
  }

  public tieneProductosSeleccionados(productos: Producto[]): boolean {
    let productosAux = productos.filter( (prod) => prod.seleccionado == true);
    return productosAux != [] && productosAux.length > 0;
  }

  public seleccionarArchivo(event) {
    this.currentBannerUpload = event.target.files;
  }

  public seleccionarArchivoLanding(event) {
    this.currentFileLandingUpload = event.target.files;
  }

  public seleccionarImagenLogoOtro(event) {
    this.currentFileLogoOtroUpload = event.target.files;
  }

  public seleccionarLogoPAS(event) {
    this.currentFileLogoPASUpload = event.target.files;
  }

  // Seleccion de logo de margen izquierdo
  public seleccionarLogoBBVA() {
    this.parametriaLegajo.logoBBVA = !this.parametriaLegajo.logoBBVA;
    this.parametriaLegajo.logoBBVABroker = false;
    this.parametriaLegajo.logoNinguno = false;
    this.parametriaLegajo.logoOtro = false;
  }

  public seleccionarLogoBBVABroker() {
    this.parametriaLegajo.logoBBVABroker = !this.parametriaLegajo.logoBBVABroker;
    this.parametriaLegajo.logoBBVA = false;
    this.parametriaLegajo.logoNinguno = false;
    this.parametriaLegajo.logoOtro = false;
  }

  public seleccionarLogoNinguno() {
    this.parametriaLegajo.logoNinguno = !this.parametriaLegajo.logoNinguno;
    this.parametriaLegajo.logoBBVABroker = false;
    this.parametriaLegajo.logoBBVA = false;
    this.parametriaLegajo.logoOtro = false;
  }

  public seleccionarLogoOtro() {
    this.parametriaLegajo.logoOtro = !this.parametriaLegajo.logoOtro;
    this.parametriaLegajo.logoBBVABroker = false;
    this.parametriaLegajo.logoNinguno = false;
    this.parametriaLegajo.logoBBVA = false;
  }

  public limpiarModal() {
    this.mensajeError = '';
    this.tipoCoberturaModal = '';
    this.previsualizarCobertura = false;
    this.productosModal = [];
    this.parametriaModal = null;
  }
}
