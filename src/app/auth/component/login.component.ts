import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginResponse } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  errorMessage: string | null;
  userData: Observable<LoginResponse>;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  get f() { return this.loginForm.controls; }

  onSubmit(formData) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.valid) {
      this.authService.logIn(formData).subscribe((res: LoginResponse) => {
        if (res && res.status == '200') {
          console.log(res);
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
