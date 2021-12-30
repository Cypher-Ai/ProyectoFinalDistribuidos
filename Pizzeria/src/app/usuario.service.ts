import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "./usuario.model";

@Injectable({
    providedIn: 'root'
  })
 export class UsuarioServicio {
   private myAppUrl='https://localhost:44305/';
   private myApiUrl='api/LogUsuarios/';
   public seLogeoUsuario!:boolean;
   constructor(private http: HttpClient){}
   public listaRegistrados: Usuario[];
   public usuarioLogeado:any[];
   guardarUsuario(usuario: Usuario): Observable<Usuario>{
     return this.http.post<Usuario>(this.myAppUrl+this.myApiUrl, usuario)
   }
   usuariosRegistrados(){
     this.http.get(this.myAppUrl+this.myApiUrl).toPromise().then(
       data=>{
         this.listaRegistrados= data as Usuario[]; 
       }
     )
   }
}
  