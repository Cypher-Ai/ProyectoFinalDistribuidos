import { Component, OnInit, Input, Output } from '@angular/core';
import { CartService } from '../cart-item/cart.service';
import { CartItem } from '../models/cart-item';
import { DashboardService } from '../modules/dashboard.service';
import { DatePipe } from '@angular/common';
import { PedidoData } from '../models/pedido-data';

import Swal from 'sweetalert2';

import { HistorialVentaService } from '../historial-venta.service';
import { UsuarioServicio } from '../servicios/usuario.service';
import { Router } from '@angular/router';

declare var jQuery: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] =[];
  cartItems_historial: any[]=[];

  id!: number;
  usuarioLogeado:any[];
  cartTotal = 0;

  logged!:boolean;
  lstPedidos: PedidoData[];
  
  constructor(private msj: CartService,
              private dashboardService: DashboardService,
              private datePipe: DatePipe,
              private usuarioServicio: UsuarioServicio,private historialVentaService:  HistorialVentaService,private router: Router
      ) { }
  ngOnInit(): void {
    console.log("xd?")

    this.msj.receiveSignal().subscribe(
      () => {

      this.enviarIconoCartTotal();
      },
      
    );
  
    this.id=this.dashboardService.idPorEntregar;
    this.usuarioLogeado=this.usuarioServicio.usuarioLogeado;
    this.logged=this.usuarioServicio.seLogeoUsuario;
    //Se limpian los elementos del carrito si es que el usuario no está logueado
    if(this.logged == false){
      this.vaciarCarrito();
    }
    console.log(this.logged);

    this.msj.recibirDatos().subscribe(
      (item: any) => {
      // tslint:disable-next-line: no-unused-expression
      this.addProductToCart(item);
      console.log(this.cartTotal)
      },
      
    );

    this.msj.recibirDatos_remove().subscribe(
      (item_remove: any) => {
      // tslint:disable-next-line: no-unused-expression
      
      this.removeProductTocart(this.cartItems, item_remove);
      this.removeProductTocart(this.cartItems_historial, item_remove);
      console.log(this.cartItems)
      },
      
    );
    
    this.msj.recibirDatos_Eliminarlista().subscribe(
      () => {
      // tslint:disable-next-line: no-unused-expression
      this.vaciarCarrito();
      console.log("Ya no hay elementos en el carrito")
      },
      
    );

  }
  // tslint:disable-next-line: typedef
  addProductToCart(item: CartItem){
    let productExists = false;
    for(let i in this.cartItems){
      if(this.cartItems[i].nombre === item.nombre){
        this.cartItems[i].cantidad+=1;
        productExists = true;
        break;
      }
    }
    if (!productExists){
      this.cartItems.push({
        id: item.id,
        nombre: item.nombre,
        detalles: item.detalles,
        precio: item.precio,
        cantidad: item.cantidad,
        imgUrl: item.imgUrl,
      });
    }

    this.cartTotal = 0;
    this.cartItems.forEach(cartItem => {
      this.cartTotal += (cartItem.cantidad * cartItem.precio);
      this.msj.enviarDatos_icono(this.cartTotal);
    });
  }
  removeProductTocart( lista: CartItem[], item: CartItem){
    for(const i in lista){
      if(lista[i].nombre === item.nombre){
        lista.splice(Number(i),1)
        this.cartTotal -= (item.cantidad*item.precio);
        this.msj.enviarDatos_icono(this.cartTotal);
        break;
      }
    }
  }
  enviarLista(){
    if (this.cartItems.length != 0){
      //tslint:disable-next-line: forin
      
      this.msj.enviarDatos_shoppingcart(this.cartItems);
      const fecha=new Date();
      const newFecha=this.datePipe.transform(fecha, 'dd-MM-yyyy');
      const hora=this.datePipe.transform(fecha, 'shortTime');
      const direccion=this.usuarioServicio.usuarioLogeado[7];
      this.id=this.dashboardService.idPorEntregar;
      this.dashboardService.idPorEntregar+=1;
      this.cartTotal=Number(this.cartTotal.toFixed(2));
      if(newFecha != null && hora!=null){
        const pedidoData=new PedidoData(0,this.cartTotal,newFecha.toString(),hora.toString(),direccion.toString());
        
        
        console.log(Object.values(pedidoData));
        this.historialVentaService.guardarPedido(pedidoData).subscribe(data =>{
          console.log("pedido con exito");
      

        this.dashboardService.lstPedidos=this.historialVentaService.lstEntregados;
    });

        console.log("Mensaje enviado "+pedidoData.total);
      }else{
        console.log("")
      }       
      
    } else {
      console.log("")
    }
    
  }
  vaciarCarrito(){
    this.cartItems = [];
  }
  enviarIconoCartTotal(){
    this.msj.enviarDatos_icono(this.cartTotal);
    console.log("El total del Carrito es: " + this.cartTotal)
  }
  enviarHistorial(){
    console.log("Se envía el historial")
    //this.msg.enviarHistorial(this.cartItems_historial);
  }
  confirmarPedido(){
    //Envía la señal para que el historial se cargue
    //this.msg.enviarSeñal();
    if(this.cartItems.length != 0){
    this.cartTotal=0;
    this.cartItems=[];
    this.enviarIconoCartTotal();
    this.router.navigateByUrl('/tarjetaCredito');
    this.cerrarModal();  

    } else {
      console.log("")
    }

  }
  
  cerrarModal() {
    jQuery('#carrito').modal('hide');
  }

}



