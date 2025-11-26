import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginUseCase } from '../../../use-cases/login.use-case';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private loginUseCase: LoginUseCase  
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.form.valid) return;
    
    // appel du use-case login
    this.loginUseCase.execute(this.form.value);
  }  
}