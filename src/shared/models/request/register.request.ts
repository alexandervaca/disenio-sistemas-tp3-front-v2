export class RequestRegisterBody {
    username: string;
    password: string;
    permiso: string;
    mail: string;
    idCategoria: number;
    nombre: string;

    constructor(username: string, password: string, permiso: string, mail: string, idCategoria: number, nombre: string) {
        this.username = username;
        this.password = password;
        this.permiso = permiso;
        this.mail = mail;
        this.idCategoria = idCategoria;
        this.nombre = nombre;
    }
}