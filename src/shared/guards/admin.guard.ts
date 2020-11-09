import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuariosService } from 'src/shared/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _usuarioService: UsuariosService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this._usuarioService.rol !== 'ADMIN_ROLE') {
        this.router.navigateByUrl('/dashboard');
        return false;
      }
      return true;
  }
  
}
