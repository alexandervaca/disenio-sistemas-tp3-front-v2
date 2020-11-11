import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/shared/services/proveedores.service';
import { Usuario } from 'src/shared/models/domain/usuario';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: Usuario[];

  constructor(private proveedoresService: ProveedoresService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(elem => {
      this.proveedoresService.getProveedoresPorCategoria(Number(elem.get('idCategoria'))).subscribe(elem => this.proveedores = elem.usuarios);
    });
  }

  irAProductos(idProveedor: number): void {
    this.router.navigateByUrl(`productos/`+idProveedor);
  }

}
