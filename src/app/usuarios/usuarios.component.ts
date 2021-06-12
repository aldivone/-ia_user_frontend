import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioApiService } from './usuario-api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [UsuarioApiService],
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];

  constructor(private usuariosApi: UsuarioApiService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usuariosApi.getUsers().subscribe((users) => (this.usuarios = users));
  }

  alterar(user: User): void {
    this.router.navigateByUrl('/usuarios-form', {
      state: {
        data: JSON.stringify(user),
      },
    });
  }
}
