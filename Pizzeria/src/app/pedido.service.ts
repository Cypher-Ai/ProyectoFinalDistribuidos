import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoU } from './pedidoU.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private myAppUrl='https://localhost:44305/';
  private myApiUrl='api/Pedido/';

  constructor(private http: HttpClient) { }

  guardarPedido(pedido: PedidoU ): Observable<PedidoU>{
    return this.http.post<PedidoU>(this.myAppUrl+this.myApiUrl,pedido)

  }

}
