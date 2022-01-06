import { Component, OnInit, Input, Output } from '@angular/core';
import { CartService } from '../cart-item/cart.service';
import { CartItem } from '../models/cart-item';
import { DashboardService } from '../modules/dashboard.service';
import { DatePipe } from '@angular/common';
import { PedidoData } from '../models/pedido-data';

import Swal from 'sweetalert2';
import { UsuarioServicio } from '../usuario.service';
import { HistorialVentaService } from '../historial-venta.service';


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
  //usuarioLogeado!: Persona;
  logged!:boolean;
  
  constructor(private msj: CartService,
              private dashboardService: DashboardService,
              private datePipe: DatePipe,
              private usuarioServicio: UsuarioServicio,private historialVentaService:  HistorialVentaService
      ) { }
  ngOnInit(): void {
    console.log("xd?")
    //Carga el precio Total que se muestra al lado del icono, específicamente lo carga ni bien inicia el componente
    //Resuelve el error de que siempre inicie con 00.00
    this.msj.receiveSignal().subscribe(
      () => {
      // tslint:disable-next-line: no-unused-expression
      this.enviarIconoCartTotal();
      },
      
    );
    /*this.msg.recibirSeñal().subscribe(
      () => {
      // tslint:disable-next-line: no-unused-expression
      this.enviarHistorial();
      },
      
    );*/
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
      let fecha=new Date();
      let newFecha=this.datePipe.transform(fecha, 'dd-MM-yyyy');
      let hora=this.datePipe.transform(fecha, 'shortTime');
      let direccion=this.usuarioServicio.usuarioLogeado[7];
      this.id=this.dashboardService.idPorEntregar;
      this.dashboardService.idPorEntregar+=1;
      this.cartTotal=Number(this.cartTotal.toFixed(2));
      if(newFecha != null && hora!=null){
        const pedidoData=new PedidoData(0,this.cartTotal,newFecha.toString(),hora.toString(),direccion.toString());
        this.dashboardService.lstPedidos.unshift(pedidoData);

        console.log(Object.values(pedidoData));
        this.historialVentaService.guardarPedido(pedidoData).subscribe(data =>{
          console.log("pedido con exito");
      
      

    });




        console.log("Mensaje enviado "+pedidoData.total);
      }else{
        console.log("xdn't")
      }       
      
    } else {
      console.log("xd")
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
      this.showConfirm();
    } else {
      console.log("No seas sapo")
    }
  }

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      
    },
    buttonsStyling: false
  })
  showConfirm(){
    this.swalWithBootstrapButtons.fire({
      title: 'Pedido en camino',
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "De acuerdo",
      width: 600,
      padding: '3em',      
    })
    this.cartTotal=0;
    this.cartItems=[];
    this.enviarIconoCartTotal();
  }
}


