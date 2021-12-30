import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart-item/cart.service";
import { UsuarioServicio } from "../usuario.service";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {

  usuarioLogeado: any[];
  constructor(
    private usuarioServicio: UsuarioServicio
  ) {
    this.usuarioLogeado = this.usuarioServicio.usuarioLogeado;
  }
  ngOnInit(): void {
    this.usuarioServicio.usuariosRegistrados();
  }
}
