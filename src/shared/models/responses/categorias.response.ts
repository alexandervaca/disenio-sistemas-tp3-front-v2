import { Categoria } from '../domain/categoria';

export class CategoriasResponse extends Response {
    categorias: Categoria[];
}