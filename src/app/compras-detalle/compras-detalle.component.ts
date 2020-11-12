import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComprasService } from 'src/shared/services/compras.service';
import { Compra } from 'src/shared/models/domain/compra';
import { CompraProducto } from 'src/shared/models/domain/compraProducto';

@Component({
  selector: 'app-compras-detalle',
  templateUrl: './compras-detalle.component.html',
  styleUrls: ['./compras-detalle.component.css']
})
export class ComprasDetalleComponent implements OnInit {

  idCompra: number;
  comprasProducto: CompraProducto[];

  constructor(public dialogRef: MatDialogRef<ComprasDetalleComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private comprasService: ComprasService) {
      this.idCompra = data.idCompra;
  }

  ngOnInit() {
    this.getComprasProductos();
  }

  getComprasProductos(): void {
    this.comprasService.getComprasDetalle(this.idCompra).subscribe(elem => {
      this.comprasProducto = elem.comprasProducto;
    });
  }

  get total(): number {
    let total = 0;
    this.comprasProducto.forEach(elem => {
      total += (elem.precio * elem.cantProducto);
    });
    return total;
  }

}
