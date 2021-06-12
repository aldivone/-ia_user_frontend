import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioApiService } from '../usuarios/usuario-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private loginApi: UsuarioApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    sessionStorage.removeItem('token');
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  async acessar(): Promise<void> {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const message = await this.loginApi
      .login(
        this.form.controls['login'].value,
        this.form.controls['password'].value
      )
      .toPromise();
    console.log(message);
    sessionStorage.setItem(
      'token',
      btoa(
        this.form.controls['login'].value +
          ':' +
          this.form.controls['password'].value
      )
    );
    this.router.navigateByUrl('/home');
  }
}
