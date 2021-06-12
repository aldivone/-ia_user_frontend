import { Component, OnInit } from '@angular/core';
import { UsuarioApiService } from './usuario-api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [UsuarioApiService],
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: User[] = [];

  constructor(private usuariosApi: UsuarioApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usuariosApi.getUsers().subscribe(users => this.usuarios = users);
  }

}
