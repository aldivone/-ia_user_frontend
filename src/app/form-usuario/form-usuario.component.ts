import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioApiService } from '../usuarios/usuario-api.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css'],
})
export class FormUsuarioComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  user?: User;
  exibir: boolean = false;

  constructor(
    private usuarioApi: UsuarioApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      const routeState = this.router.getCurrentNavigation()?.extras.state;
      if (routeState) {
        this.user = routeState.data ? JSON.parse(routeState.data) : null;
      }
    }
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      const userLogin = JSON.parse(userJson);
      if (userLogin) {
        console.log('User logado ====> ', JSON.stringify(userLogin));
        console.log('User alterado ====> ', JSON.stringify(this.user));
        console.log('Usuário admin ====> ', userLogin.admin);
        console.log(
          'Usuário alterado ====> ',
          userLogin.login === this.user?.login
        );
        this.exibir =
          userLogin.admin ||
          userLogin.login === this.user?.login ||
          this.user === null;
        console.log('Desabilitar a senha ====> ', this.exibir);
      }
    }
    console.log('Usuário recebido nos parâmetros ===> ', this.user);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      email: new FormControl('', [Validators.email, Validators.required]),
      admin: [false, Validators.required],
    });
    if (this.user) {
      this.form = this.formBuilder.group({
        name: [this.user.name, Validators.required],
        login: [this.user.login, Validators.required],
        password: [this.user.password, Validators.required],
        email: new FormControl(this.user.email, [
          Validators.email,
          Validators.required,
        ]),
        admin: [this.user.admin, Validators.required],
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  async acessar(): Promise<void> {
    try {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      if (this.user) {
        this.user.email = this.form.controls['email'].value;
        this.user.name = this.form.controls['name'].value;
        this.user.admin = this.form.controls['admin'].value;
        this.user.login = this.form.controls['login'].value;
        this.user.password = this.form.controls['password'].value;
        const message = await this.usuarioApi.update(this.user).toPromise();
        console.log(message);
      } else {
        const user: User = {
          email: this.form.controls['email'].value,
          name: this.form.controls['name'].value,
          admin: this.form.controls['admin'].value,
          login: this.form.controls['login'].value,
          password: this.form.controls['password'].value,
        };
        const message = await this.usuarioApi.insert(user).toPromise();
        console.log(message);
      }
      this.router.navigateByUrl('/usuarios');
    } catch (exception) {
      if (exception && exception.status && exception.status === 422) {
        alert(exception.error.mensagem);
      } else {
        alert(
          'Infelizmente não conseguimos processar sua solicitação, tentar novamente!'
        );
      }
    }
  }
}
