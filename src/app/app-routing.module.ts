import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrincipalComponent } from './principal/principal.component';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosproveedorComponent } from './productosproveedor/productosproveedor.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ProveedorGuard } from 'src/shared/guards/proveedor.guard';
import { AdminGuard } from 'src/shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'categorias', canActivate: [AuthGuard], component: CategoriasComponent },
      { path: 'proveedores/:idCategoria', canActivate: [AuthGuard], component: ProveedoresComponent },
      { path: 'productos', canActivate: [AuthGuard], component: ProductosComponent },
      { path: 'proveedor/productos', canActivate: [AuthGuard, ProveedorGuard], component: ProductosproveedorComponent },
      { path: 'proveedor/notificaciones', canActivate: [AuthGuard, ProveedorGuard], component: NotificacionesComponent },
      { path: 'administracion', canActivate: [AuthGuard, AdminGuard], component: AdministracionComponent },
      { path: 'productos/:idProveedor', canActivate: [AuthGuard], component: ProductosComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
