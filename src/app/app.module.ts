import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    InicioComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
