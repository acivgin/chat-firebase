import { Component, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginValid = true;
  public loginForm!: FormGroup;
  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _authService: AuthenticationService,
    private readonly toast: HotToastService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl(
        {
          value: '',
          disabled: false,
        },
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        {
          value: '',
          disabled: false,
        },
        [Validators.required]
      ),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {}

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this._authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          loading: 'Logging in...',
          success: 'Logged in successfully!',
          error: 'Login failed!',
        })
      )
      .subscribe(() => this._router.navigate(['/home']));
  }
}
