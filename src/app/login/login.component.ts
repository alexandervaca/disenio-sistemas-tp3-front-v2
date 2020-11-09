import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../shared/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }

  formLogin: FormGroup;
  usernameFormControl: FormControl;
  passwordFormControl: FormControl;

  ngOnInit() {
    this.usernameFormControl = new FormControl(null, Validators.required);
    this.passwordFormControl = new FormControl(null, Validators.required);

    this.formLogin = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl
    });
  }

  login(): void {
    if (!this.formLogin.valid) {
      Swal.fire('Error', "Por favor ingrese correctamente sus credenciales.", 'warning');
      return;
    }

    this.usuarioService.login(this.usernameFormControl.value, this.passwordFormControl.value)
      .subscribe(
        elem => { 
          Swal.fire('Exito', "Logín satisfactorio.", 'success');
          localStorage.setItem('token', elem.token);
         },
        error => { 
          Swal.fire('Error', "Credenciales inválidas. En caso de persistir el error contacte con un administrador.", 'error');
         }
      );
  }

}
