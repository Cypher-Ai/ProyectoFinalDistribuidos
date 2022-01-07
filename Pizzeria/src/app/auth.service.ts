import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "./modelos/usuario.model";
@Injectable({
    providedIn: 'root'
  })
 export class AuthService {
   private myAppUrl='https://localhost:44305/';
   private myApiUrl='api/cuentaAdmin/auth/';
   constructor(private http: HttpClient){}
   auth(){    
   }
   headers = new Headers();
   usuariosRegistrados(){
   }
}
  