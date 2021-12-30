import { Component, OnInit } from '@angular/core';
import { AdminServicio } from 'src/app/admin.service';
import { UsuarioServicio } from 'src/app/usuario.service';


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