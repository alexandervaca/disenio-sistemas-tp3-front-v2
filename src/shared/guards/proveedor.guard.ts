import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorGuard implements CanActivate {
  constructor(private _usuarioService: UsuariosService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this._usuarioService.isProveedor) {
        if (this._usuarioService.isAdmin) {
          this.router.navigateByUrl('/administracion');
        } else {
          this.router.navigateByUrl('/');
        }
      }
      return this._usuarioService.isProveedor;
  }
  
}
