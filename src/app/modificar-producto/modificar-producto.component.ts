import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/shared/models/domain/producto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductosService } from 'src/shared/services/producto.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any, private productosService: ProductosService) {
    this.producto = data.producto;
  }

  ngOnInit() {
    this.descripcionFormControl = new FormControl(this.producto.descProducto, [Validators.required]);
    this.precioFormControl = new FormControl(this.producto.precio, [Validators.required]);
    this.stockFormControl = new FormControl(this.producto.stock, [Validators.required]);
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
    this.productosService
      .modificarProducto
      (this.producto.idProducto, this.descripcionFormControl.value,
        this.precioFormControl.value, this.stockFormControl.value, this.imagenFormControl.value)
        .subscribe( elem => {
          this.dialogRef.close();
          Swal.fire('Exito', "Modificación de producto satisfactoria.", 'success');
        }
        , error => Swal.fire('Error', "Ocurrió un error al modificar el producto. Por favor contacte con un administrador.", 'error'));
  }
}
