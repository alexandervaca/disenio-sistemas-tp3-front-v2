import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/shared/models/domain/producto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductosService } from 'src/shared/services/producto.service';
import { UsuariosService } from 'src/shared/services/usuario.service';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  modificarProductoFG: FormGroup;
  descripcionFormControl: FormControl;
  precioFormControl: FormControl;
  stockFormControl: FormControl;
  imagenFormControl: FormControl;

  producto: Producto;

  constructor(public dialogRef: MatDialogRef<ModificarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private productosService: ProductosService, private usuarioService: UsuariosService, private router: Router) {
    this.producto = data.producto;
  }

  ngOnInit() {
    console.log(this.data);
    console.log(this.producto);
    this.descripcionFormControl = new FormControl(this.producto.descProducto, [Validators.required]);
    this.precioFormControl = new FormControl(this.producto.precio, [Validators.required, Validators.pattern("(([0-9]+)(|[,|.][0-9]{1,2}))")]);
    this.stockFormControl = new FormControl(this.producto.stock, [Validators.required, Validators.pattern("[0-9]+")]);
    const imagen = this.producto.imagen;

    this.imagenFormControl = new FormControl(null);

    this.modificarProductoFG = new FormGroup({
      descripcion: this.descripcionFormControl,
      precio: this.precioFormControl,
      stock: this.stockFormControl,
      imagen: this.imagenFormControl
    });
  }

  modificarProducto(): void {
    if (!this.modificarProductoFG.valid) {
      Swal.fire('Error', "Formulario con datos incorrectos. En caso de persistir el error contacte con un administrador.", 'error');
      return;
    }
    const imagen: string = this.imagenFormControl.value;
    const partImage = (imagen) ? imagen.split("\\") : [];
    const lengthImage = partImage.length;
    const nameImage = (imagen) ? partImage[lengthImage - 1] : null;
    this.productosService
      .modificarProducto
      (this.producto.idProducto, this.descripcionFormControl.value,
        this.precioFormControl.value, this.stockFormControl.value, nameImage)
      .subscribe(elem => {
        this.dialogRef.close();
        Swal.fire('Exito', "Modificación de producto satisfactoria.", 'success');
      }
        , error => {
          if (error.error.message === 'Acceso denegado') {
            this.dialogRef.close();
            this.usuarioService.cerrarSesion();
            this.router.navigateByUrl('/login');
            return;
          } else {
            Swal.fire('Error', "Ocurrió un error al modificar el producto. Por favor contacte con un administrador.", 'error');
          }
        });
  }
}
