import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email/email.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UsersService } from 'src/app/services/users/users.service';
import { VisitsService } from 'src/app/services/visits/visits.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vark-test',
  templateUrl: './vark-test.component.html',
  styleUrls: ['./vark-test.component.css'],
})
export class VarkTestComponent implements OnInit {
  public matrix: any = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  varkTestForm = new FormGroup({
    0: new FormControl(''),
    1: new FormControl(''),
    2: new FormControl(''),
    3: new FormControl(''),
    4: new FormControl(''),
    5: new FormControl(''),
    6: new FormControl(''),
    7: new FormControl(''),
    8: new FormControl(''),
    9: new FormControl(''),
    10: new FormControl(''),
    11: new FormControl(''),
    12: new FormControl(''),
    13: new FormControl(''),
    14: new FormControl(''),
    15: new FormControl(''),
    16: new FormControl(''),
    17: new FormControl(''),
    18: new FormControl(''),
    19: new FormControl(''),
    20: new FormControl(''),
    21: new FormControl(''),
    22: new FormControl(''),
    23: new FormControl(''),
    24: new FormControl(''),
    25: new FormControl(''),
    26: new FormControl(''),
    27: new FormControl(''),
    28: new FormControl(''),
    29: new FormControl(''),
    30: new FormControl(''),
    31: new FormControl(''),
    32: new FormControl(''),
    33: new FormControl(''),
    34: new FormControl(''),
    35: new FormControl(''),
    36: new FormControl(''),
    37: new FormControl(''),
    38: new FormControl(''),
    39: new FormControl(''),
    40: new FormControl(''),
    41: new FormControl(''),
    42: new FormControl(''),
    43: new FormControl(''),
    44: new FormControl(''),
    45: new FormControl(''),
    46: new FormControl(''),
    47: new FormControl(''),
    48: new FormControl(''),
    49: new FormControl(''),
    50: new FormControl(''),
    51: new FormControl(''),
    52: new FormControl(''),
    53: new FormControl(''),
    54: new FormControl(''),
    55: new FormControl(''),
    56: new FormControl(''),
    57: new FormControl(''),
    58: new FormControl(''),
    59: new FormControl(''),
    60: new FormControl(''),
    61: new FormControl(''),
    62: new FormControl(''),
    63: new FormControl(''),
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private usersService: UsersService,
    private storageService: StorageService,
    private emailService: EmailService,
    private visitsService: VisitsService
  ) {}

  ngOnInit(): void {
    this.visitsService.updateVisits('vark');
  }

  public send() {
    let r = this.calculate();
    let max = this.getMax(r);
    let u = this.storageService.getUser();

    this.usersService
      .updateUser(u._id, {
        varkResult: max,
      })
      .subscribe({
        next: (res) => {
          swal.fire(
            '¡Datos guardados!',
            'Tu personalidad es: ' +
              'V: ' +
              r.v +
              ' A: ' +
              r.a +
              ' R: ' +
              r.r +
              ' K: ' +
              r.k,
            'success'
          );
          let email = this.storageService.getUser().email;
          this.emailService
            .sendResult({
              subject: 'Resultados del Test VARK',
              to: email,
              test: 'VARK',
              result: max,
            })
            .subscribe({
              error(err) {
                console.log(err);
              },
            });
        },
        error(err) {
          console.log(err);
        },
      });
  }

  private calculate() {
    let form: any = this.varkTestForm.value;
    let result: any = {};

    let mapper: any = {
      0: { a: 1, b: 0, c: 2, d: 3 },
      1: { a: 1, b: 0, c: 2, d: 3 },
      2: { a: 1, b: 3, c: 2, d: 0 },
      3: { a: 2, b: 3, c: 0, d: 1 },
      4: { a: 3, b: 2, c: 1, d: 0 },
      5: { a: 3, b: 0, c: 2, d: 1 },
      6: { a: 3, b: 1, c: 2, d: 0 },
      7: { a: 2, b: 0, c: 3, d: 1 },
      8: { a: 0, b: 1, c: 2, d: 3 },
      9: { a: 1, b: 0, c: 3, d: 2 },
      10: { a: 1, b: 2, c: 0, d: 3 },
      11: { a: 3, b: 2, c: 1, d: 0 },
      12: { a: 3, b: 2, c: 1, d: 0 },
      13: { a: 3, b: 2, c: 0, d: 1 },
      14: { a: 3, b: 2, c: 1, d: 0 },
      15: { a: 2, b: 3, c: 1, d: 0 },
    };

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        let index = mapper[i][form[j + 4 * i]];

        if (index !== undefined) {
          this.matrix[i][index] = 1;
        }
      }
    }

    this.transpose(this.matrix).forEach((col, index) => {
      switch (index) {
        case 0:
          result.v = col.reduce((a, b) => a + b, 0);
          break;
        case 1:
          result.a = col.reduce((a, b) => a + b, 0);
          break;
        case 2:
          result.r = col.reduce((a, b) => a + b, 0);
          break;
        case 3:
          result.k = col.reduce((a, b) => a + b, 0);
          break;
      }
    });

    return result;
  }

  private transpose(array: Array<Array<number>>): number[][] {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
  }

  private getMax(r: any): any {
    let list: any = r;
    let keys = Object.keys(list);
    let min = list[keys[0]];
    let max = list[keys[0]];

    for (let i = 1; i < keys.length; i++) {
      let value = list[keys[i]];
      if (value < min) min = value;
      if (value > max) max = value;
    }

    let i = Object.values(list).indexOf(max);

    return keys[i];
  }
}
