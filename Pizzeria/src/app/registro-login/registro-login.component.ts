import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioServicio } from '../servicios/usuario.service';

@Component({
  selector: 'app-registro-login',
  templateUrl: './registro-login.component.html',
  styleUrls: ['./registro-login.component.css'],
})
export class RegistroLoginComponent implements OnInit {
  

  Usuarios:any[];
  constructor(
    private usuarioServicio: UsuarioServicio,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.Usuarios = this.usuarioServicio.usuarioLogeado;
  }
  login() {
    this.router.navigate(['usuario/login']);
  }
}
