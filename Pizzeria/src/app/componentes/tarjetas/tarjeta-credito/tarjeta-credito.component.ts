import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private tarjetaService: TarjetaService) {
    this.form = this.formBuilder.group({
      id: 0,
      titular:['',[Validators.required]],
      numeroTarjeta: ['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      fechaExpiracion: ['',[Validators.required]],
      cvv: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
    })
   }

  ngOnInit(): void {

  }

  guardarTarjeta(){
    const tarjeta: TarjetaCredito = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,

      
      
    }
    console.log(Object.values(tarjeta));
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data =>{
      console.log("Guardado con exito");
      
      

    });
    this.form.reset();

    
    
  }

}
