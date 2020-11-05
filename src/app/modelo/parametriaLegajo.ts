import { Parametria } from './parametria';

export class ParametriaLegajo {
    id: number;
    numeroLegajo: string = '';

    logoBBVA: boolean = false;
    pathLogo: string = '';

    alianza: boolean = false;
    pathAlianza: string = '';

    logoNinguno: boolean = false;
    
    logoBBVABroker: boolean = false;
    pathBBVABroker: string = '';

    logoOtro: boolean = false;
    pathLogoOtro: string = '';

    juntos: boolean = false;
    pathJuntos: string = ''; // Guarda el nombre del banner landing
    urlJuntos: string = ''; // Guarda la url del landing

    //urlLanding: string = '';
    parametrias : Parametria[] = [];

    /*constructor(productosNotebook: Producto[], productosCelular: Producto[], productosPortatil: Producto[]) {
        this.parametrias.push(new Parametria(productosNotebook));
        this.parametrias.push(new Parametria(productosCelular));
        this.parametrias.push(new Parametria(productosPortatil));
    }*/
}