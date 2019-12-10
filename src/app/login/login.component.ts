import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {first} from "rxjs/operators";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  invalidLogin : boolean= false;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.controls.email.value === 'user@gmail.com' && this.loginForm.controls.password.value === '123456') {
        this.router.navigate(['/registration']);
    } else {
      this.invalidLogin = true;
    }
  }


  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });

}
}

