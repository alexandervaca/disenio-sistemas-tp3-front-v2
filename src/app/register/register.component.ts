import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriasService } from '../../shared/services/categorias.service';
import { Categoria } from 'src/shared/models/domain/categoria';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../shared/services/usuario.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  tipoUsuarioFormControl: FormControl;
  usernameFormControl: FormControl;
  passwordFormControl: FormControl;
  mailFormControl: FormControl;
  categoriaFormControl: FormControl;
  nombreFormControl: FormControl;

  categorias: Categoria[];

  constructor(private router: Router, private categoriaService: CategoriasService, private usuarioServie: UsuariosService) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(elem => {
      this.categorias = elem.categorias;
    })

    this.nombreFormControl = new FormControl(null, [Validators.required, Validators.min(5), Validators.max(30)]);
    this.tipoUsuarioFormControl = new FormControl(null, Validators.required);
    this.usernameFormControl = new FormControl(null, [Validators.required, Validators.min(5), Validators.max(30)]);
    this.passwordFormControl = new FormControl(null, [Validators.required, Validators.min(5), Validators.max(30)]);
    this.mailFormControl = new FormControl(null, [Validators.required, Validators.email, Validators.min(5), Validators.max(30)]);
    this.categoriaFormControl = new FormControl(null);
    this.formRegister = new FormGroup({
      tipoUsuario: this.tipoUsuarioFormControl,
      username: this.usernameFormControl,
      password: this.passwordFormControl,
      mail: this.mailFormControl,
      categoria: this.categoriaFormControl,
      nombre: this.nombreFormControl
    });
  }

  register(): void {
    if (!this.formRegister.valid || this.tipoUsuarioProveedorSelected && !this.categoriaFormControl.value) {
      Swal.fire('Error', "Por favor ingrese correctamente sus todos los datos solicitados.", 'warning');
      return;
    }

    this.usuarioServie.register(this.usernameFormControl.value, this.passwordFormControl.value,
      this.tipoUsuarioFormControl.value, this.mailFormControl.value,
      this.categoriaFormControl.value, this.nombreFormControl.value)
      .pipe(
        finalize(()=> this.formRegister.reset()))
      .subscribe(
        elem => {
          Swal.fire('Exito', "Registro satisfactorio.", 'success');
          this.router.navigate(['/dashboard']);
        },
        error => Swal.fire('Error', "Ocurrió un error al realizar el registro, contacte con un administrador.", 'error')
      );
  }

  get tipoUsuarioProveedorSelected(): boolean {
    return this.tipoUsuarioFormControl.value === 'PROVEEDOR';
  }

}
