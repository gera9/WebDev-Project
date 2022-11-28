import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tests-settings',
  templateUrl: './tests-settings.component.html',
  styleUrls: ['./tests-settings.component.css'],
})
export class TestsSettingsComponent implements OnInit {
  globalAccountSwitch = new FormGroup({
    switchh: new FormControl(),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getActiveGlobalUser().subscribe({
      next: (user) => {
        this.globalAccountSwitch.controls.switchh.setValue(user.active);
      },
      error(err) {
        console.error(err);
      },
    });
  }

  onChange(e: any) {
    this.authService.setActiveGlobalUser(e.target.checked).subscribe({
      error(err) {
        console.error(err);
      },
    });
  }
}
