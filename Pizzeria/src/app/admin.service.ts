import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Admin } from "./admin.model";

@Injectable({
    providedIn: 'root'
  })
 export class AdminServicio {
    private myAppUrl='https://localhost:44305/';
    private myApiUrl='api/Administradores/';
    public seLogeoAdmin!:boolean;
    constructor(private http: HttpClient){}
    public listaRegistrados: Admin[];
    public adminLogeado:any[];
    adminsRegistrados(){
     this.http.get(this.myAppUrl+this.myApiUrl).toPromise().then(
       data=>{
         this.listaRegistrados= data as Admin[]; 
       }
     )
   }

}
  