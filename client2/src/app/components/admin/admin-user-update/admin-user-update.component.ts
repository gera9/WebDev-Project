import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// Service
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.css'],
})
export class AdminUserUpdateComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
      ),
    ]),
    department: new FormControl('', [
      Validators.required,
      Validators.pattern(/EDI|Facturacion/gi),
    ]),
    varkResult: new FormControl('null'),
    personalityResult: new FormControl('null'),
  });

  isUpdateForm: boolean = false;

  constructor(
    private userService: UsersService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.userService.getUserById(params['id']).subscribe({
        next: (user) => {
          this.userForm.setValue(user);
          this.isUpdateForm = true;
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }

  public sendData() {
    this.userService
      .updateUser(this.userForm.controls['_id'].value, this.userForm.value)
      .subscribe({
        next: (user) => {
          Swal.fire('¡Hecho!', 'El usuario ha sido actualizado', 'success');
          this.router.navigate(['/admin']);
        },
        error() {
          Swal.fire('Ups!', 'El usuario NO ha sido actualizado', 'error');
        },
      });
  }

  public search() {
    const querie = `?email=${this.userForm.controls['email'].value}&username=${this.userForm.controls['username'].value}`;
    console.log(querie);
    this.userService.getUsersByQueries(querie).subscribe({
      next: (users) => {
        this.userForm.setValue(users[0]);
      },
      error(err) {
        Swal.fire('Ups!', 'El usuario NO ha sido encontrado', 'error');
      },
    });
  }
}
