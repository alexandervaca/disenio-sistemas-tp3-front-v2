import { Usuario } from '../domain/usuario';

export class GetUsuarioResponse extends Response {
    usuario: Usuario;
}