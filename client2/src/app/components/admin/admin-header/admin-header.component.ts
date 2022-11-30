import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {}

  public isLoggedIn: boolean = false;

  ngOnInit(): void {
    let user = this.storageService.getUser();
    if (user !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    console.log(user);
  }

  public logOut() {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
