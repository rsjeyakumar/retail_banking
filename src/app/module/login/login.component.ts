import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { HttpService } from '../../shared/services/http.service';
import { CommunicationService } from '../../shared/services/communication.service';
import { EndPoints } from '../../shared/services/end-points.enum';
import { Registration, USERSESSION, SuccessResponse } from '../../models/app.models';

/* Prime ng message service */


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {
  toggleLoginReg = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginvalidation = false;
  loginSpin: boolean;
  registerSpin: boolean;
  registerSuccessMsg = false;
  registerApiResponse: SuccessResponse;
  phonePattern: RegExp = /^[7-9][0-9]{9}$/;

  constructor(
    private http: HttpService,
    private router: Router,
    private passdata: CommunicationService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    /* Loginform creation */
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      role: new FormControl('customer', [Validators.required])
    });
    /* registration form creation */
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      address1: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(this.phonePattern)]),
      pan: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required, this.validatedob]),
      pincode: new FormControl(null, [Validators.required, this.validateNumber]),
      terms: new FormControl(null, [Validators.required]),
    });
    const usesession: USERSESSION = JSON.parse(sessionStorage.getItem('user'));
    if (usesession) {
      usesession.userName !== 'admin' ?
        this.router.navigate(['/home']) : this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['']);
    }
  }


  /* toggle login form and registration form */

  toggleForm() {
    this.toggleLoginReg = !this.toggleLoginReg;
  }

  /* Login api submit */

  loginSubmit() {
    if (this.loginForm.value.role === 'admin') {
      sessionStorage.clear();
      const res = {
        userName: this.loginForm.value.username
      };
      const data = {
        userDetails: true
      };
      sessionStorage.setItem('user', JSON.stringify(res));
      this.passdata.sendMessage(data);
      this.router.navigate(['/admin']);


    } else {
      const queryparams = {
        userName: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      this.loginSpin = true;
      this.http.createData(EndPoints.LOGIN, queryparams).subscribe(
        (res: SuccessResponse) => {
          this.loginSpin = false;
          if (res.statusCode === 200) {
            const data = {
              userDetails: true
            };
            sessionStorage.clear();
            this.loginvalidation = false;
            sessionStorage.setItem('user', JSON.stringify(res));
            this.passdata.sendMessage(data);
            this.router.navigate(['/home']);
          } else {
            sessionStorage.clear();
            this.loginvalidation = true;
          }
        }
      );
    }

  }
  /* Register api submit */
  registerFormSubmit() {
    this.registerSpin = true;
    const registerFormobj = {
      address1: this.registerForm.value.address,
      address2: this.registerForm.value.address1,
      dob: this.datePipe.transform(this.registerForm.value.date, 'yyyy-MM-dd'),
      emailAddress: this.registerForm.value.email,
      firstName: this.registerForm.value.firstname,
      lastName: this.registerForm.value.lastname,
      panNumber: this.registerForm.value.pan,
      phone: this.registerForm.value.phone,
      pinCode: this.registerForm.value.pincode,
    };

    this.http.createData(EndPoints.REGISTRATION, registerFormobj).subscribe(
      (res: SuccessResponse) => {
        this.registerSuccessMsg = true;
        this.registerSpin = false;
        this.registerForm.reset();
        if (res.statusCode === 200) {
          this.registerApiResponse = res;
        }
      }
    );
  }

  /* Reset Register form */
  resetRegiserform() {
    this.registerSpin = false;
    this.registerForm.reset();
  }


  /* validate dob is 18years above or not */
  validatedob(c: FormControl) {
    const today = new Date();
    const birthDate = new Date(c.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 ? null : {
      validatedob: {
        valid: false
      }
    };
  }

  /* Validate Number  */
  validateNumber(c: FormControl) {
    const numberExp: RegExp = /^[0-9]*$/;
    console.dir(c);
    return numberExp.test(c.value) ? null : {
      validateNumber: {
        valid: false
      }
    };

  }
}
