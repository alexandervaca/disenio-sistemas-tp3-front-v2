import { Categoria } from '../domain/categoria';

export class CategoriasResponse {
    status: string;
    code: string;
    date: Date;
    categorias: Categoria[];
}