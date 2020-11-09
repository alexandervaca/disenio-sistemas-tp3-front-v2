import { Categoria } from './categoria';
import { Permiso } from './permiso';

export class Usuario {
    idUsuario: number;
	nombre: string;
	mail: string;
    categoria: Categoria;
	permiso: Permiso;
}