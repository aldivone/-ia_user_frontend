import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios-form', component: FormUsuarioComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
