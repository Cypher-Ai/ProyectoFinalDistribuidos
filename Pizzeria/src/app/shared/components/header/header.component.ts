import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServicio } from 'src/app/servicios/admin.service';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usuarioLogeado:any[];
  logged!:boolean;
  loggedAdmin!:boolean;
  cartTotal = 0;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private usuarioServicio: UsuarioServicio, 
    private adminServicio:AdminServicio, private router:Router) { }

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logOut(){
    this.logged=false;
    this.loggedAdmin=false;
    this.adminServicio.seLogeoAdmin=false;
    this.usuarioServicio.seLogeoUsuario=false;

   Swal.fire(
      '	(っ˘̩╭╮˘̩)っ \nCerraste Sesión',
      'Adiós🤧',
      'success'
    ).then(()=>{
      this.router.navigateByUrl('/menu');
    });    
  }

}