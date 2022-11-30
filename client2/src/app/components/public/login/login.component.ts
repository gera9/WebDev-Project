import { Component, OnInit, ɵformatRuntimeError } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    isAdmin: new FormControl(false),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
      ),
    ]),
  });

  constructor(
    private storageService: StorageService,
    private usersService: UsersService,
    private adminService: AdminService,
    private configService: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public login() {
    if (this.userForm.controls['isAdmin'].value) {
      let queries = `?email=${this.userForm.controls['email'].value}&password=${this.userForm.controls['password'].value}`;
      this.adminService.getAdminsByQueries(queries).subscribe({
        next: (value) => {
          if (!value) {
            Swal.fire('¡Ups!', 'Credenciales Incorrectas', 'error');
            return;
          }

          this.storageService.saveUser(value[0]);
          this.router.navigate(['/admin']);
        },
        error(err) {
          Swal.fire(
            '¡Ups!',
            'No se pudo obtener el ususario. Inténtalo de nuevo más tarde',
            'error'
          );
        },
      });
      return;
    }

    let query = `?email=${this.userForm.controls['email'].value}&password=${this.userForm.controls['password'].value}`;
    this.usersService.getUsersByQueries(query).subscribe({
      next: (value) => {
        if (!value) {
          Swal.fire('¡Ups!', 'Credenciales Incorrectas', 'error');
          return;
        }

        this.configService.getConfig().subscribe({
          next: (config) => {
            if (value[0].department == 'Facturacion') {
              value[0].department = 'Factura';
            }
            if (
              config.activatedTests === 'Ninguna' ||
              value[0].department != config.activatedTests
            ) {
              Swal.fire(
                '¡Ups!',
                'No hay acceso por parte de los administradores',
                'info'
              );
              return;
            }
            this.storageService.saveUser(value[0]);
            this.router.navigate(['tests/home']);
          },
        });
      },
      error(err) {
        Swal.fire(
          '¡Ups!',
          'Error en el servidor. Inténtalo más tarde',
          'error'
        );
      },
    });
  }

  private canAccess(user: any): any {
    let r = true;

    setTimeout(() => {}, 1000);

    return r;
  }
}
