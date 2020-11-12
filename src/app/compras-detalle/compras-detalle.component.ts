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

  compra: Compra;
  comprasProducto: CompraProducto[];

  constructor(public dialogRef: MatDialogRef<ComprasDetalleComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private comprasService: ComprasService) {
    this.compra = data.compra;
  }

  ngOnInit() {
    this.getComprasProductos(this.compra.idCompra);
  }

  getComprasProductos(idCompra: number): void {
    this.comprasService.getComprasDetalle(idCompra).subscribe(elem => {
      this.comprasProducto = elem.comprasProducto;
      //this.dialogRef.close();
    });
  }
}
