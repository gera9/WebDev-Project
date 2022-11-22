import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {}

  public signout() {
    this.storageService.clean();
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return this.isLoggedIn();
  }
}
