import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { CartService } from 'src/app/cart-item/cart.service';
import { Router } from '@angular/router';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/modelos/usuario.model';
import { Admin } from 'src/app/modelos/admin.model';
import { AdminServicio } from 'src/app/servicios/admin.service';
import { CuentaAdmin } from 'src/app/modelos/cuentaAdminAuth.model';

declare var jQuery: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  correoLoginInput: string;
  contraseniaLoginInput: string;
  formLogin: FormGroup;

  seLogeoUsuario!: boolean;
  seLogeoAdmin!: boolean;
  //para prueba para prueba 
  loginErrado:boolean=false;
  
  //necesario para extraer usuario de la base de datos
  private usuario: any[];
  private admin: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private msj: CartService,
    private usuarioServicio: UsuarioServicio, private adminServicio: AdminServicio
  ) {
    this.formLogin = this.formBuilder.group({
      correo: formBuilder.control('', [Validators.required, Validators.email]),
      contrasenia: formBuilder.control(null, [Validators.required]),
    });
  }
  ngOnInit() {
    this.usuarioServicio.usuariosRegistrados();
    this.adminServicio.adminsRegistrados();
    
  }
  //metodo para marcar los errores en el html
  get f() {
    return this.formLogin.controls;
  }
  public onSubmit() {
    this.submitted = true;
    if (this.formLogin.invalid) {
      return;
    }
  }
  //metodo para los validadores
  public control(name: string) {
    return this.formLogin.get(name);
  }
  obtenerDatosForm() {
    this.correoLoginInput = this.formLogin.get('correo')?.value;
    this.contraseniaLoginInput = this.formLogin.get('contrasenia')?.value;
  }
  
  login(){
    if (this.formLogin.valid){
    this.obtenerDatosForm();
    this.usuarioServicio.usuarioLog(this.correoLoginInput , this.contraseniaLoginInput).subscribe((usuarioApi: Usuario)=>{
      this.usuario = Object.values(usuarioApi);
      this.seLogeoUsuario=true;
      this.loginUserCorrecto();
      this.limpiarFom();
      this.cerrarModal();
    }, (err:any)=>{
      if(err.message.includes("400")){ 
        this.logContraseñaIncorreta();
      }else {
        this.loginErrado=true;
      }
    });
    if(this.loginErrado==false){
      this.adminServicio.adminLog(this.correoLoginInput , this.contraseniaLoginInput).subscribe((adminApi:Admin)=>{
        this.admin = Object.values(adminApi);
        this.seLogeoAdmin=true;
        this.loginAdminCorrecto();
        this.limpiarFom();
        this.cerrarModal();
      }, (err:any)=>{
        if(err.message.includes("400")){ 
          this.logContraseñaIncorreta();
        }else {
          this.loginError();
        }
      });

    }else{
      this.loginError();
    }
  }else{
    this.loginVacio();
  }
  }
  //mensajes modales :3
  private loginUserCorrecto() {
    Swal.fire(
      ' (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧\nBienvenido ' + this.usuario[1] + ' ' + this.usuario[2],
      '🤡Disfruta de tu experiencia🤡',
      'success'
    ).then(() => {
      this.router.navigateByUrl('/account');
      this.usuarioServicio.usuarioLogeado = this.usuario;
      this.usuarioServicio.seLogeoUsuario = this.seLogeoUsuario;
      
      //Se envia una señal para limpiar el carrito
      this.msj.enviarDatos_Eliminarlista();
    });
  }
  private loginAdminCorrecto() {
    Swal.fire(
      '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ \nBienvenido ' + this.admin[1],
      '🤡Disfruta de tu experiencia🤡',
      'success'
    ).then(()=>{
      this.router.navigateByUrl('/admin');
      this.adminServicio.adminLogeado=this.admin;
      this.adminServicio.seLogeoAdmin=this.seLogeoAdmin;
    });
  }
  
  private logContraseñaIncorreta() {
    Swal.fire(
      '	(っ˘̩╭╮˘̩)っ \nContraseña incorrecta',
      '🤡Ingrese nuevamente🤡',
      'warning'
    );
  }
  private loginError() {
    Swal.fire(
      '(＃￣ω￣)\n Login errado',
      '🤡Verifique bien sus datos🤡 ',
      'error'
    );
  }
  loginVacio() {
    Swal.fire({
      title: 'Llene todos los campos',
      width: 600,
      padding: '3em',
      background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.taringa.net/knn/identity/aHR0cHM6Ly9rMzMua24zLm5ldC90YXJpbmdhLzAvRC9BL0IvMS84L3ZhZ29uZXR0YXMvNUQ0LmdpZg")
        left top
        no-repeat
      `,
    });
  }
  cerrarModal() {
    jQuery('#loginCliente').modal('hide');
  }
  //metodo para limpiar el formulario
  private limpiarFom() {
    this.formLogin.reset();
  }
}
