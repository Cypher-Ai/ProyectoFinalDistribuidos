import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoData } from './models/pedido-data';
import { Pedido } from './pedido.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialVentaService {
  private myAppUrl='https://localhost:44305/';
  private myApiUrl='api/Historiall/';

  constructor(private http: HttpClient) {

   }

   guardarPedido(pedido: PedidoData): Observable<PedidoData>{
    return this.http.post<PedidoData>(this.myAppUrl+this.myApiUrl,pedido);

   }
  
}
