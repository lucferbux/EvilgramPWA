import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { NotifyService } from '../../core/notify.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  userForm: FormGroup;

  constructor(public auth: AuthService , private fb: FormBuilder, public snackBar: MatSnackBar, public notify: NotifyService) {
    this.notify.logginStatus.subscribe(
      (status: string) => this.openSnackBar(status)
    );
   }

  ngOnInit() {
    this.userForm = this.fb.group({
          email: ['', [Validators.required,
                        Validators.email ]
        ],
          password: ['', [Validators.required, 
                        Validators.min(6),
                        Validators.max(25)]],
    })
  }

  login(): void {
    this.auth.emailLoginForm(this.userForm.value);
  }

  async submitHandler() {
    const formValue = this.userForm.value;
    try {
      await this.auth.emailLoginForm(formValue);
      console.log("llego a succes true")
    } catch(err) {
      console.log(err)
    }
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }

}
