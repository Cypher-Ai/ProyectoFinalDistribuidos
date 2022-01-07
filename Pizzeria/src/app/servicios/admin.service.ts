import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Admin } from "../modelos/admin.model";

@Injectable({
    providedIn: 'root'
  })
 export class AdminServicio {
    private myAppUrl='https://localhost:44305/';
    private myApiUrl='api/Administradores/';
   
    constructor(private http: HttpClient){}

    public seLogeoAdmin!:boolean;
    public listaRegistrados: Admin[];
    public adminLogeado:any[];
    adminsRegistrados(){
     this.http.get(this.myAppUrl+this.myApiUrl).toPromise().then(
       data=>{
         this.listaRegistrados= data as Admin[]; 
       }
     )
   }
   adminLog(correo:string, contrasenia:string): Observable<Admin>{

    return this.http.get<Admin>(this.myAppUrl+this.myApiUrl+"login/" + correo+"/"+contrasenia);
   }
}
  