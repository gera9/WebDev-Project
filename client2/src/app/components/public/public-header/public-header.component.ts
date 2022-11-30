import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css'],
})
export class PublicHeaderComponent implements OnInit {
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
