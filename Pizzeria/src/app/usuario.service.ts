import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "./usuario.model";

@Injectable({
    providedIn: 'root'
  })
 export class UsuarioServicio {
   myAppUrl='https://localhost:44305/';
   myApiUrl='api/LogUsuarios/';
   list: Usuario[];
   constructor(private http: HttpClient){}
   
   guardarUsuario(usuario: Usuario): Observable<Usuario>{
     return this.http.post<Usuario>(this.myAppUrl+this.myApiUrl, usuario)
   }
}