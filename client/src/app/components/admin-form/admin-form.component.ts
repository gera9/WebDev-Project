import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  userNameError = false;
  userPasswordError = false;

  userNameMessageError =
    'El nombre de ususario debería de contener SÓLO letras y números. Mínimo 4.';
  userPasswordMessageError =
    'La contraseña tiene que tener una longitud mínima de 8.';

  newAdminForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authServive: AuthService) {}

  ngOnInit(): void {}

  public onClick() {
    if (this.newAdminForm.invalid) {
      this.userNameError = this.newAdminForm.controls.username.invalid;
      this.userPasswordError = this.newAdminForm.controls.password.invalid;
      return;
    }

    let username: any = this.newAdminForm.controls.username.value;
    let password: any = this.newAdminForm.controls.password.value;

    this.authServive.signup(username, password).subscribe({
      next(value) {
        alert('¡Administrador agregado!');
      },
      error(err) {
        console.error(err);
      },
    });
    console.log(this.newAdminForm.value);
  }
}
