import { Usuario } from '../domain/usuario';

export class GetUsuariosResponse extends Response{
    usuarios: Usuario[];
}