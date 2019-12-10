import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder , private router: Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({

          firstName: ['', Validators.required],
          MiddleName:[''],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          mobilenumber: ['', [Validators.minLength(8), Validators.maxLength(12), Validators.pattern('^[0-9]*$')]],
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      this.router.navigate(['/login']);
  }


  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
