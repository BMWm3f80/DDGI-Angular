import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AppService } from '../../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService} from '@app/_services/authentication.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    if (this.loginForm.valid) {
      // this.appService.login();
      this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).pipe(first()).subscribe(
        data =>{
          console.log(this.authService.currentUserValue);
          if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
          }
        },
        error => {
                this.toastr.error('Error', error);
        }
      );

    } else {
      this.toastr.error('Hello world!', 'Toastr fun!');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
