import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { FooterComponent } from './footer/footer.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductosComponent } from './productos/productos.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosproveedorComponent } from './productosproveedor/productosproveedor.component';
import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { AdministracionComponent } from './administracion/administracion.component';

@NgModule({
  declarations: [
    AppComponent,
    AplicacionComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    CategoriasComponent,
    PrincipalComponent,
    ProveedoresComponent,
    FooterComponent,
    ContactoComponent,
    ProductosComponent,
    InicioComponent,
    ProductosproveedorComponent,
    ModificarProductoComponent,
    CrearProductoComponent,
    NotificacionesComponent,
    AdministracionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  entryComponents: [ModificarProductoComponent, CrearProductoComponent],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
