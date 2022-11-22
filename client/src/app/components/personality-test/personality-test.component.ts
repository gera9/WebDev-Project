import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScoresService } from 'src/app/services/scores/scores.service';

@Component({
  selector: 'app-personality-test',
  templateUrl: './personality-test.component.html',
  styleUrls: ['./personality-test.component.css'],
})
export class PersonalityTestComponent implements OnInit {
  public outgoingPoints: number = 0; // E
  public introvertPoints: number = 0; // I
  public sensoryPoints: number = 0; // S
  public intuitivePoints: number = 0; // N
  public rationalPoints: number = 0; // T
  public emotionalPoints: number = 0; // F
  public qualifierPoints: number = 0; // J
  public perceptualPoints: number = 0; // P

  public isValid: boolean = false;

  personalityTestForm = new FormGroup({
    1: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    2: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    3: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    4: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    5: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    6: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    7: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    8: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    9: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    10: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    11: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    12: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    13: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    14: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    15: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    16: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    17: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    18: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    19: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    20: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    21: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    22: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    23: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    24: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    25: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    26: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    27: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    28: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    29: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    30: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    31: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    32: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    33: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    34: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    35: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    36: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    37: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    38: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    39: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    40: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    41: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    42: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    43: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    44: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    45: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    46: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    47: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    48: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    49: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    50: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    51: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    52: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    53: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    54: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    55: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    56: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    57: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    58: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    59: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    60: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    61: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    62: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    63: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    64: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    65: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    66: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    67: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    68: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    69: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    70: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    71: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    72: new FormControl(0, [Validators.pattern('([^5]){1}')]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private scoreService: ScoresService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.personalityTestForm.valid) {
      this.isValid = this.personalityTestForm.valid;
      return;
    }
    this.calculate();

    this.scoreService
      .saveScore({
        name: this.personalityTestForm.controls.name.value,
        result: this.getResult(),
      })
      .subscribe({
        next: () => {
          alert(this.getResult());
        },
        error(err) {
          console.error(err);
        },
      });
  }

  private getResult(): string {
    let result: string = '';

    if (this.outgoingPoints > this.introvertPoints) {
      result += 'E';
    } else {
      result += 'I';
    }
    if (this.sensoryPoints > this.intuitivePoints) {
      result += 'S';
    } else {
      result += 'N';
    }
    if (this.rationalPoints > this.emotionalPoints) {
      result += 'T';
    } else {
      result += 'F';
    }
    if (this.qualifierPoints > this.perceptualPoints) {
      result += 'J';
    } else {
      result += 'P';
    }

    return result;
  }

  private calculate() {
    let form: any = this.personalityTestForm.value;

    for (let i = 0; i < 4; i++) {
      let left = 0;
      let right = 0;

      for (let j = 0; j < 18; j++) {
        if (j % 2 === 0) {
          right += form[j + 18 * i + 2];
        } else {
          left += form[j + 18 * i];
        }
      }

      switch (i) {
        case 0:
          this.outgoingPoints = left;
          this.introvertPoints = right;
          break;
        case 1:
          this.sensoryPoints = left;
          this.intuitivePoints = right;
          break;
        case 2:
          this.rationalPoints = left;
          this.emotionalPoints = right;
          break;
        case 3:
          this.qualifierPoints = left;
          this.perceptualPoints = right;
          break;
      }
    }
  }
}
