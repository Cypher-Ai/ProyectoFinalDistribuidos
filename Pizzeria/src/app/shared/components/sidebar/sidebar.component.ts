import { Component, OnInit } from '@angular/core';
import { AdminServicio } from 'src/app/servicios/admin.service';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  adminLogeado:any[];
  constructor(private adminServicio: AdminServicio) { }

  ngOnInit() {
    this.adminLogeado=this.adminServicio.adminLogeado;
  }

}