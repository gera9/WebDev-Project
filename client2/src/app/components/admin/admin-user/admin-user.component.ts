import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Service
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {
  constructor(private userService: UsersService, private router: Router) {}

  public users: Array<any> = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  public deleteVark(id: any) {
    Swal.fire({
      title: '¿Quieres borrar los resultados de la prueba VARK?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `No Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUser(id, { varkResult: 'null' }).subscribe({
          next: (v) => {
            Swal.fire('¡Hecho!', 'Prueba VARK borrada', 'success');
            this.router.navigate(['/admin']);
          },
          error(err) {
            Swal.fire('¡Ups!', 'Prueba VARK NO borrada', 'error');
          },
        });
      }
    });
  }

  public deleteUser(id: any) {
    Swal.fire({
      title: '¿Quieres borrar este usuario?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `No Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: (v) => {
            Swal.fire('¡Hecho!', 'Usuario borrado', 'success');
            this.router.navigate(['/admin']);
          },
          error(err) {
            Swal.fire('¡Ups!', 'Usuario NO borrado', 'error');
          },
        });
      }
    });
  }
}
