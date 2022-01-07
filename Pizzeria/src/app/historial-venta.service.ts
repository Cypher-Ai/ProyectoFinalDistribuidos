import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoData } from './models/pedido-data';

@Injectable({
  providedIn: 'root'

})
export class HistorialVentaService {
  
  private myAppUrl='https://localhost:44305/';
  private myApiUrl='api/HistorialVentas';

  constructor(private http: HttpClient) {

   }
   lstEntregados: PedidoData[];
   guardarPedido(pedido: PedidoData): Observable<PedidoData>{
    return this.http.post<PedidoData>(this.myAppUrl+this.myApiUrl,pedido);
   }
   getPedidos(){
     return this.http.get(this.myAppUrl+this.myApiUrl).toPromise().then(
      data=>{
        this.lstEntregados= data as PedidoData[]; 
      }
    )
   }

   
}
