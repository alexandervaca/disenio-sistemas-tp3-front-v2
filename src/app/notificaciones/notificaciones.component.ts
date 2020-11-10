import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/shared/services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  notificaciones: Notification[];

  constructor(private notificacionesService: NotificacionesService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos(): void {
    this.notificacionesService.getNotificaciones()
    .subscribe(
      elem => { 
        this.notificaciones = elem.notificaciones;
       },
      error => { 
        this.notificaciones = [];
       }
    );
  }

}
