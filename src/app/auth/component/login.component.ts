import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../reducers';
import {LogIn} from '../actions/auth.actions';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  public user: User = new User();
  errorMessage: string | null;
  getState: Observable<any>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {

    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.createForm();
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.user = this.loginForm.value;

    const payload = {
      username: this.user.username,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));


  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


}
