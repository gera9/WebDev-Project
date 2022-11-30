import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmailService } from 'src/app/services/email/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  suggestionsForm: any = new FormGroup({});

  constructor(
    private emailService: EmailService,
    private formBuilder: FormBuilder
  ) {}

  valid = false;
  siteKey = '6LdJsEMjAAAAABZfC2URWa6vTA5rbH3wiP83xQ8L';
  ngOnInit(): void {
    this.suggestionsForm = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      email: new FormControl('', [Validators.email]),
      text: new FormControl('', [Validators.required]),
    });
  }

  public onClick() {
    this.emailService
      .sendSuggestionEmail({
        subject: 'Sugerencias',
        email: this.suggestionsForm.controls.email.value,
        text: this.suggestionsForm.controls.text.value,
      })
      .subscribe({
        next(value) {
          Swal.fire('¡Hecho!', 'Se han enviado tus sugerencias!', 'success');
        },
        error(err) {
          console.error(err);
        },
      });
    console.log(this.suggestionsForm.controls);
  }

  public handleSuccess() {
    this.valid = true;
  }
}
