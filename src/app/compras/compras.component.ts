import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/shared/services/compras.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Compra } from 'src/shared/models/domain/compra';
import { ComprasDetalleComponent } from '../compras-detalle/compras-detalle.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  compras: Compra[];

  constructor(private compraService: ComprasService, private dialog: MatDialog) { }

  ngOnInit() {
    this.compraService.getCompras().subscribe(elem => this.compras = elem.compras);
  }

  get total(): number {
    let total = 0;
    this.compras.forEach(elem => {
      total += elem.precioTotal;
    });
    return total;
  }

  irAlDetalle(compra: Compra): void {
    this.dialog.open(ComprasDetalleComponent, {
      data: {
        compra: compra
      }
    });
  }

}
