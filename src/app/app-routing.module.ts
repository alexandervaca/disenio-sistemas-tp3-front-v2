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

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'categorias', canActivate: [AuthGuard], component: CategoriasComponent },
      { path: 'proveedores/:idProveedor', canActivate: [AuthGuard], component: ProveedoresComponent },
      { path: 'productos', canActivate: [AuthGuard], component: ProductosComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      /* { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
       { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' }},
       { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
       { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
       { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
       { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda general' }},

       // Mantenimientos
       { path: 'usuarios', canActivate: [AdminGuard] , component: UsuariosComponent, data: { titulo: 'Usuarios' }},
       { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos' }},
       { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Detalle del médico' }},
       { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' }},*/
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
