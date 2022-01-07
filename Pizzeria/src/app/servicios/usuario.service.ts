import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../modelos/usuario.model";
@Injectable({
    providedIn: 'root'
  })
 export class UsuarioServicio {
   private myAppUrl='https://localhost:44305/';
   private myApiUrl='api/LogUsuarios/';
   constructor(private http: HttpClient){}
   public seLogeoUsuario!:boolean;
   public listaRegistrados: Usuario[];
   public usuarioLogeado:any[];

   guardarUsuario(usuario: Usuario): Observable<Usuario>{
     return this.http.post<Usuario>(this.myAppUrl+this.myApiUrl, usuario)
   }
   headers = new Headers();
   

   usuariosRegistrados(){
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
     this.http.get(this.myAppUrl+this.myApiUrl).toPromise().then(
       data=>{
         this.listaRegistrados= data as Usuario[]; 
       }
     )
   }
   usuarioLog(correo:string, contrasenia:string): Observable<Usuario>{
     return this.http.get<Usuario>(this.myAppUrl+this.myApiUrl+"login/" + correo+"/"+contrasenia);
   }
}
  