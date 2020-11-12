import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from 'src/shared/services/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/shared/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  crearProductoFG: FormGroup;
  descripcionFormControl: FormControl;
  precioFormControl: FormControl;
  stockFormControl: FormControl;
  imagenFormControl: FormControl;

  constructor(public dialogRef: MatDialogRef<CrearProductoComponent>, private productosService: ProductosService, private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.descripcionFormControl = new FormControl(null, [Validators.required]);
    this.precioFormControl = new FormControl(null, [Validators.required]);
    this.stockFormControl = new FormControl(null, [Validators.required, Validators.pattern("[0-9]+")]);
    this.imagenFormControl = new FormControl(null);

    this.crearProductoFG = new FormGroup({
      descripcion: this.descripcionFormControl,
      precio: this.precioFormControl,
      stock: this.stockFormControl,
      imagen: this.imagenFormControl
    });
  }

  crearProducto(): void {
    if (!this.crearProductoFG.valid) {
      Swal.fire('Error', "Formulario con datos incorrectos. En caso de persistir el error contacte con un administrador.", 'error');
      return;
    }

    this.productosService
      .crearProducto
      (this.descripcionFormControl.value, this.precioFormControl.value, this.stockFormControl.value, this.imagenFormControl.value)
      .subscribe(elem => {
        this.dialogRef.close();
        Swal.fire('Exito', "Creación de producto satisfactoria.", 'success');
      }
        , error => {
          if (error.error.message === 'Acceso denegado') {
            this.dialogRef.close();
            this.usuarioService.cerrarSesion();
            this.router.navigateByUrl('/login');
            return;
          } else {
            Swal.fire('Error', "Ocurrió un error al crear el producto. Por favor contacte con un administrador.", 'error');
          }
        });
  }

}
