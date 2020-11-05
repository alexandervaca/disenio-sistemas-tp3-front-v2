import { Injectable } from '@angular/core';
import { HttpClient,  HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ArchivoResponse } from '../modelo/archivoResponse';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  private access_token = environment.TOKEN;

  constructor(protected http : HttpClient) { }

  public subirBanner(file: File, tipoCobertura: string, legajoSelected: string): Promise<ArchivoResponse> {
    const data: FormData = new FormData();
    data.append('file', file[0]);

    return new Promise((resolve, reject) =>{
      this.http.post(environment.API_ENDPOINT + '/parametria/subirImagen.do?access_token=' + this.access_token +
        '&tipoCobertura=' + tipoCobertura + '&legajoSelected=' + legajoSelected, data)
        .subscribe((response: ArchivoResponse) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public obtenerImagen(nombreImagen: string, tipoCobertura: string, legajoSelected: string, porDefault?: boolean): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get(environment.API_ENDPOINT + '/parametria/obtenerImagen.do?access_token=' + this.access_token +
        '&nombreImagen=' + nombreImagen + '&tipoCobertura=' + tipoCobertura + '&legajoSelected=' + legajoSelected + '&porDefault=' + porDefault)
          .subscribe((response: ArchivoResponse) => {
            console.log(response);
            resolve(response);
          }, (error: Error) => {
            console.log(error);
            reject(error);
          });
      });
  }

  public subirBannerLanding(file: File, legajoSelected: string): Promise<ArchivoResponse> {
    const data: FormData = new FormData();
    data.append('file', file[0]);

    return new Promise((resolve, reject) =>{
      this.http.post(environment.API_ENDPOINT + '/parametria/subirBannerLanding.do?access_token=' + this.access_token + '&legajoSelected=' + legajoSelected, data)
        .subscribe((response: ArchivoResponse) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public subirLogoOtro(file: File, legajoSelected: string): Promise<ArchivoResponse> {
    const data: FormData = new FormData();
    data.append('file', file[0]);

    return new Promise((resolve, reject) =>{
      this.http.post(environment.API_ENDPOINT + '/parametria/subirLogoOtro.do?access_token=' + this.access_token + '&legajoSelected=' + legajoSelected, data)
        .subscribe((response: ArchivoResponse) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public subirLogoPAS(file: File, legajoSelected: string): Promise<ArchivoResponse> {
    const data: FormData = new FormData();
    data.append('file', file[0]);

    return new Promise((resolve, reject) =>{
      this.http.post(environment.API_ENDPOINT + '/parametria/subirLogoPAS.do?access_token=' + this.access_token + '&legajoSelected=' + legajoSelected, data)
        .subscribe((response: ArchivoResponse) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}