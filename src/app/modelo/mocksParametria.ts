import { ParametriaLegajo } from './parametriaLegajo';
import { Parametria } from './parametria';
import { Producto } from './producto';
import { TipoProductoEnum } from './tipoProductoEnum';

export let parametriaMOCKS = new Map();


export let parametriaVacia: ParametriaLegajo = buildParametriaVacia();

parametriaMOCKS.set('parametriaVacia', parametriaVacia);

function buildProductosVacio() : Producto[] {
    let productos: Producto[] = [];
    productos.push(new Producto());
    productos.push(new Producto());
    productos.push(new Producto());
    return productos;
}

function buildParametriaVacia() : ParametriaLegajo {
    let paramVacia : ParametriaLegajo = new ParametriaLegajo();
    paramVacia.numeroLegajo = '';

    let paramNotebook = new Parametria(buildProductosVacio());
    paramNotebook.orden = '';
    paramNotebook.tipoCobertura = TipoProductoEnum.NOTEBOOK;
    paramNotebook.descripcionProducto = 'Notebook';
    paramNotebook.habilitado = false;
    paramNotebook.pathBanner = '';
    paramVacia.parametrias.push(paramNotebook);

    let paramCelular = new Parametria(buildProductosVacio());
    paramCelular.orden = '';
    paramCelular.tipoCobertura = TipoProductoEnum.CELULAR;
    paramCelular.descripcionProducto = 'Celular';
    paramCelular.habilitado = false;
    paramCelular.pathBanner = '';
    paramVacia.parametrias.push(paramCelular);

    let paramTecno = new Parametria(buildProductosVacio());
    paramTecno.orden = '';
    paramTecno.tipoCobertura = TipoProductoEnum.TECNO_PORTATIL;
    paramTecno.descripcionProducto = 'Tecnologia Portatil';
    paramTecno.habilitado = false;
    paramTecno.pathBanner = '';
    paramVacia.parametrias.push(paramTecno);

    let paramHogar = new Parametria(buildProductosVacio());
    paramHogar.orden = '';
    paramHogar.tipoCobertura = TipoProductoEnum.HOGAR;
    paramHogar.descripcionProducto = 'Hogar';
    paramHogar.habilitado = false;
    paramHogar.pathBanner = '';
    paramVacia.parametrias.push(paramHogar);

    let paramBici = new Parametria(buildProductosVacio());
    paramBici.orden = '';
    paramBici.tipoCobertura = TipoProductoEnum.BICICLETAS;
    paramBici.descripcionProducto = 'Bicicletas';
    paramBici.habilitado = false;
    paramBici.pathBanner = '';
    paramVacia.parametrias.push(paramBici);

    return paramVacia;
}









let parametriaLegajo1: ParametriaLegajo = buildParametria('72428');
parametriaMOCKS.set('72428', parametriaLegajo1);



function buildParametria(numeroLegajo: string) : ParametriaLegajo {
    let paramLegajo1 : ParametriaLegajo = new ParametriaLegajo();

    paramLegajo1.numeroLegajo = numeroLegajo;

    paramLegajo1.logoBBVA = true;
    paramLegajo1.pathLogo = 'assets/parametria/imagenes/logo-bbva-seguros-blanco.png';
    paramLegajo1.alianza = true;
    paramLegajo1.pathAlianza = 'assets/parametria/imagenes/LOGO-NICETO-blanco.png';
    paramLegajo1.juntos = true;
    paramLegajo1.pathJuntos = 'assets/parametria/imagenes/banner_1960x350_3_juntos.jpg';

    let paramNotebook = new Parametria(buildProductosNotebook());
    paramNotebook.orden = '1';
    paramNotebook.tipoCobertura = TipoProductoEnum.NOTEBOOK;
    paramNotebook.descripcionProducto = 'Notebook';
    paramNotebook.habilitado = true;
    paramNotebook.pathBanner = 'assets/parametria/imagenes/banner_1960x350_3.jpg';
    paramLegajo1.parametrias.push(paramNotebook);


    let paramCelular = new Parametria(buildProductosCelular());
    paramCelular.orden = '2';
    paramCelular.tipoCobertura = TipoProductoEnum.CELULAR;
    paramCelular.descripcionProducto = 'Celular';
    paramCelular.habilitado = true;
    paramCelular.pathBanner = 'assets/parametria/imagenes/banner_1960x350_3.jpg';
    paramLegajo1.parametrias.push(paramCelular);


    let paramTecno = new Parametria(buildProductosTecnoPortatil());
    paramTecno.orden = '3';
    paramTecno.tipoCobertura = TipoProductoEnum.TECNO_PORTATIL;
    paramTecno.descripcionProducto = 'Tecnologia Portatil';
    paramTecno.habilitado = true;
    paramTecno.pathBanner = 'assets/parametria/imagenes/banner_1960x350_3.jpg';
    paramLegajo1.parametrias.push(paramTecno);


    let productos: Producto[] = [];
    productos.push(new Producto());
    productos.push(new Producto());
    productos.push(new Producto());

    let paramHogar = new Parametria(productos);
    paramHogar.orden = '';
    paramHogar.tipoCobertura = TipoProductoEnum.HOGAR;
    paramHogar.descripcionProducto = 'Hogar';
    paramHogar.habilitado = false;
    paramHogar.pathBanner = '';
    paramLegajo1.parametrias.push(paramHogar);

    let paramBici = new Parametria(productos);
    paramBici.orden = '';
    paramBici.tipoCobertura = TipoProductoEnum.BICICLETAS;
    paramBici.descripcionProducto = 'Bicicletas';
    paramBici.habilitado = false;
    paramBici.pathBanner = '';
    paramLegajo1.parametrias.push(paramBici);

    return paramLegajo1;
}

function buildProductosNotebook() : Producto[] {
    let productos: Producto[] = [];

    let prod1: Producto = new Producto();
    prod1.rama = '7';
    prod1.codigoProducto = 'NBK';
    prod1.codigoProductoGaus = '44';
    prod1.sumaAsegurada = '550000';
    prod1.descripcion = 'NOTEBOOK 5500';
    productos.push(prod1);

    let prod2: Producto = new Producto();
    prod2.rama = '7';
    prod2.codigoProducto = 'NBK';
    prod2.codigoProductoGaus = '45';
    prod2.sumaAsegurada = '800000';
    prod2.descripcion = 'NOTEBOOK 8000';
    productos.push(prod2);

    let prod3: Producto = new Producto();
    prod3.rama = '7';
    prod3.codigoProducto = 'NBK';
    prod3.codigoProductoGaus = '47';
    prod3.sumaAsegurada = '1200000';
    prod3.descripcion = 'NOTEBOOK 12000';
    productos.push(prod3);

    return productos;
}

function buildProductosCelular() : Producto[] {
    let productos: Producto[] = [];

    let prod1: Producto = new Producto();
    prod1.rama = '7';
    prod1.codigoProducto = 'POR';
    prod1.codigoProductoGaus = '150';
    prod1.sumaAsegurada = '400000';
    prod1.descripcion = 'SEGURO DE CELULARES $4.000';
    productos.push(prod1);

    let prod2: Producto = new Producto();
    prod2.rama = '7';
    prod2.codigoProducto = 'POR';
    prod2.codigoProductoGaus = '151';
    prod2.sumaAsegurada = '700000';
    prod2.descripcion = 'SEGURO DE CELULARES $7.000';
    productos.push(prod2);

    let prod3: Producto = new Producto();
    prod3.rama = '7';
    prod3.codigoProducto = 'POR';
    prod3.codigoProductoGaus = '152';
    prod3.sumaAsegurada = '1000000';
    prod3.descripcion = 'SEGURO DE CELULARES $10.000';
    productos.push(prod3);

    return productos;
}

function buildProductosTecnoPortatil() : Producto[] {
    let productos: Producto[] = [];

    let prod1: Producto = new Producto();
    prod1.rama = '7';
    prod1.codigoProducto = 'TEC';
    prod1.codigoProductoGaus = '160';
    prod1.sumaAsegurada = '360000';
    prod1.descripcion = 'TECNOLOGIA PORTATIL 3000';
    productos.push(prod1);

    let prod2: Producto = new Producto();
    prod2.rama = '7';
    prod2.codigoProducto = 'TEC';
    prod2.codigoProductoGaus = '161';
    prod2.sumaAsegurada = '570000';
    prod2.descripcion = 'TECNOLOGIA PORTATIL 5000';
    productos.push(prod2);

    let prod3: Producto = new Producto();
    prod3.rama = '7';
    prod3.codigoProducto = 'TEC';
    prod3.codigoProductoGaus = '162';
    prod3.sumaAsegurada = '780000';
    prod3.descripcion = 'TECNOLOGIA PORTATIL 7000';
    productos.push(prod3);

    return productos;
}






/*
function buildParametriaLegajo2(paramLegajo: ParametriaLegajo) {
    paramLegajo.numeroLegajo = '72428';
    paramLegajo.logoBBVA = true;
    paramLegajo.pathLogo = '';
    paramLegajo.alianza = true;
    paramLegajo.pathAlianza = '';
    paramLegajo.juntos = true;
    paramLegajo.pathJuntos = '';

    let productosParam: [] = [];
    productosParam['rama'] = '7';
    productosParam['codigoProducto'] = 'POR';
    productosParam['codigoProductoGaus'] = '150';
    productosParam['sumaAsegurada'] = '400000';
    productosParam['descripcionProducto'] = 'SEGURO DE CELULARES';
    
    let param1 = new Parametria(productosParam);
    param1.orden = '1';
    param1.productoDescripcion = 'Celular';
    param1.agregado = true;
    param1.pathBanner = '';
    paramLegajo2.parametrias.push(param1);
}

function buildParametriaLegajo3(paramLegajo: ParametriaLegajo) {
    paramLegajo.numeroLegajo = '72428';
    paramLegajo.logoBBVA = true;
    paramLegajo.pathLogo = '';
    paramLegajo.alianza = true;
    paramLegajo.pathAlianza = '';
    paramLegajo.juntos = true;
    paramLegajo.pathJuntos = '';

    let productosParam: [] = [];
    productosParam['rama'] = '7';
    productosParam['codigoProducto'] = 'TEC';
    productosParam['codigoProductoGaus'] = '160';
    productosParam['sumaAsegurada'] = '360000';
    productosParam['descripcionProducto'] = 'TECNOLOGIA PORTATIL 3000';
    
    let param1 = new Parametria(productosParam);
    param1.orden = '1';
    param1.productoDescripcion = 'Tecnologia Portatil';
    param1.agregado = true;
    param1.pathBanner = '';
    paramLegajo3.parametrias.push(param1);
}*/