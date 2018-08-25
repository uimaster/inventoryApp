import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRequest, LoginResponse} from './user.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  errorMessage: string | null;
  userData: Observable<LoginResponse>;
  loggedIn = JSON.parse(localStorage.getItem('isLogin'));

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    if (this.loggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit(formData: LoginRequest) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.valid) {
      this.authService.logIn(formData).subscribe((res: LoginResponse) => {
        if (res && res.status === '200') {
            const token = res.data[0].bearerToken;
            localStorage.setItem('token', token);
            localStorage.setItem('isLogin', JSON.parse('true'));
            this.router.navigate(['/dashboard']);
        } else {
         alert(res.message);
        }
      });
    }

  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


}
