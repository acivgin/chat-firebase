import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordNotMatched: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent implements OnInit {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly toast: HotToastService
  ) {}

  signUpForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator() }
  );

  ngOnInit(): void {}

  submit() {
    if (!this.signUpForm.valid) {
      return;
    }

    const { name, email, password } = this.signUpForm.value;

    this.authService
      .register(name, email, password)
      .pipe(
        this.toast.observe({
          loading: 'Signing in...',
          success: 'Congrats! You are successfully registered !',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/home']);
      });
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
}
