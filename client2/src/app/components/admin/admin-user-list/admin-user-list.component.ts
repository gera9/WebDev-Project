import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
})
export class AdminUserListComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {}

  public users: Array<any> = [];

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users: Array<any>) => {
        this.users = users;
      },
    });
  }

  public deleteVark(userId: string) {
    Swal.fire({
      title: '¿Quieres eliminar el registro de VARK?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'No eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.updateUser(userId, { varkResult: 'null' }).subscribe({
          next: (users) => {
            Swal.fire('¡Hecho!', 'Se ha eliminado el registro', 'success');
            this.router.navigate(['/admin']);
          },
          error: (error) => {
            Swal.fire(
              'Oops...',
              'No se ha podido eliminar el registro',
              'error'
            );
          },
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado nada', '', 'info');
      }
    });
  }

  public deletePersonality(userId: string) {
    Swal.fire({
      title: '¿Quieres eliminar el registro de Personalidad?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'No eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService
          .updateUser(userId, { personalityResult: 'null' })
          .subscribe({
            next: (users) => {
              Swal.fire('¡Hecho!', 'Se ha eliminado el registro', 'success');
              this.router.navigate(['/admin']);
            },
            error: (error) => {
              Swal.fire(
                'Oops...',
                'No se ha podido eliminar el registro',
                'error'
              );
            },
          });
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado nada', '', 'info');
      }
    });
  }

  public deleteUser(userId: string) {
    Swal.fire({
      title: '¿Quieres eliminar el usuario?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'No eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(userId).subscribe({
          next: (users) => {
            Swal.fire('¡Hecho!', 'Se ha eliminado el usuario', 'success');
            this.router.navigate(['/admin']);
          },
          error: (error) => {
            Swal.fire(
              'Oops...',
              'No se ha podido eliminar el ususario',
              'error'
            );
          },
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado el usuario', '', 'info');
      }
    });
  }
}
