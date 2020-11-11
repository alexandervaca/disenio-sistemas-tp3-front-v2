import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../shared/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuariosService, private router: Router) { }

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
          this.usuarioService.setUsername(elem.username);
          this.usuarioService.setPermiso(elem.permiso.replace('[', '').replace(']', ''));
          this.usuarioService.setToken(elem.token);
          switch (this.usuarioService.loggedRol) {
            case "ROLE_ADMIN":
              this.router.navigateByUrl(`/administracion`);
              break;
              case "ROLE_PROVEEDOR":
                this.router.navigateByUrl(`proveedor/productos`);
                break;
            default:
              this.router.navigateByUrl(`/`);
              break;
          }
         },
        error => { 
          Swal.fire('Error', "Credenciales inválidas. En caso de persistir el error contacte con un administrador.", 'error');
         }
      );
  }

}
