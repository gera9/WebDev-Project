import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from 'src/app/services/config/config.service';
import { VisitsService } from 'src/app/services/visits/visits.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  configGroup = new FormGroup({
    selectedDepartment: new FormControl('Selecciona un área'),
  });

  private mapp = {
    Todas: 1,
    Ninguna: 2,
    EDI: 3,
    Factura: 4,
  };

  varkVisits = 0;
  personalityVisits = 0;
  constructor(
    private configService: ConfigService,
    private visitsService: VisitsService
  ) {}

  ngOnInit(): void {
    this.configService.getConfig().subscribe({
      next: (value) => {
        switch (value.activatedTests) {
          case 'Todas':
            this.configGroup.controls.selectedDepartment.setValue('1');
            break;
          case 'Ninguna':
            this.configGroup.controls.selectedDepartment.setValue('2');
            break;
          case 'EDI':
            this.configGroup.controls.selectedDepartment.setValue('3');
            break;
          case 'Factura':
            this.configGroup.controls.selectedDepartment.setValue('4');
            break;
        }
      },
      error(err) {
        console.error(err);
      },
    });

    this.visitsService.getVisits().subscribe({
      next: (value) => {
        this.varkVisits = value.vark;
        this.personalityVisits = value.personality;
      },
    });
  }

  public onChange() {
    let selected = '';
    switch (this.configGroup.controls.selectedDepartment.value) {
      case '1':
        selected = 'Todas';
        break;
      case '2':
        selected = 'Ninguna';
        break;
      case '3':
        selected = 'EDI';
        break;
      case '4':
        selected = 'Factura';
        break;
    }
    this.configService.updateConfig({ activatedTests: selected }).subscribe({
      error(err) {
        console.error(err);
      },
    });
  }
}
