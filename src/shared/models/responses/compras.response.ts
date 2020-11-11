import { Compra } from '../domain/compra';

export class ComprasResponse extends Response {
    compras: Compra[];
}