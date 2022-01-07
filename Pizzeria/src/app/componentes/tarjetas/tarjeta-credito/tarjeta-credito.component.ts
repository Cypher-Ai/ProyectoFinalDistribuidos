import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/tarjeta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private tarjetaService: TarjetaService, private router: Router) {
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
    this.showConfirm();
    this.router.navigateByUrl('/menu');    
  }

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
    },
    buttonsStyling: false
  })
 
  showConfirm(){
    this.swalWithBootstrapButtons.fire({
      title: 'Pedido en camino',
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "De acuerdo",
      width: 600,
      padding: '3em', 
    })
    
  }


}
