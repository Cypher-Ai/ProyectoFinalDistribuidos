import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart-item/cart.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioServicio } from '../usuario.service';
import { AdminServicio } from '../admin.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuarioLogeado: any[];
  logged!:boolean;
  loggedAdmin!:boolean;

  // tslint:disable-next-line: typedef
  cartTotal: number = this.receiveTotal();


  constructor(private msj: CartService, private usuarioServicio: UsuarioServicio, private router: Router,
    private adminServicio: AdminServicio) { }

  ngOnInit(): void {

    this.usuarioLogeado = this.usuarioServicio.usuarioLogeado;
    this.logged=this.usuarioServicio.seLogeoUsuario;
    this.loggedAdmin=this.adminServicio.seLogeoAdmin;
    console.log(this.logged);
    
  
    this.msj.sendSignal();
  }
  logOut(){
    this.logged=false;
    this.loggedAdmin=false;
    this.adminServicio.seLogeoAdmin=false;
    this.usuarioServicio.seLogeoUsuario=false;
    //Se envía la señal para eliminar la lista que hay dentro del carrito
    this.msj.enviarDatos_Eliminarlista();

   Swal.fire(
      '	(っ˘̩╭╮˘̩)っ \nCerraste Sesión',
      'Adiós🤧',
      'success'
    ).then(()=>{
      this.router.navigateByUrl('/menu');
    });    
  }

  receiveTotal(){
    this.msj.recibirDatos_icono().subscribe(
      (item: any) => {
      // tslint:disable-next-line: no-unused-expression
      
      this.cartTotal = Number(item);
      console.log("Icono carrito = "+this.cartTotal)
      },
      
    );
    return Number(this.cartTotal);
  }
}
