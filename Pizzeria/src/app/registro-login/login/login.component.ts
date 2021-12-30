import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { CartService } from 'src/app/cart-item/cart.service';
import { Router } from '@angular/router';
import { UsuarioServicio } from 'src/app/usuario.service';
import { Usuario } from 'src/app/usuario.model';
import { Admin } from 'src/app/admin.model';
import { AdminServicio } from 'src/app/admin.service';
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
  logAError!: boolean;
  logUError!: boolean;
  logContraseniaIncorreta!: boolean;



  
  //necesario para extraer usuario de la base de datos
  private listaARegistrados:Admin[];
  private listaURegistrados:Usuario[];
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

  //verificacion del login
  login() {
    this.obtenerDatosForm();

    this.usuarioServicio.usuariosRegistrados();

    this.listaURegistrados=Object.values(this.usuarioServicio.listaRegistrados);

    this.adminServicio.adminsRegistrados();

    this.listaARegistrados=Object.values(this.adminServicio.listaRegistrados);

    if (this.formLogin.valid) {
      
      for (let i = 0; i < this.listaURegistrados.length; i++) {
        this.usuario = Object.values(this.usuarioServicio.listaRegistrados[i]);
        if (
          this.correoLoginInput === this.usuario[5] &&
          this.contraseniaLoginInput === this.usuario[8]
        ) {
          this.seLogeoUsuario=true;
          break;
        } else if (
          this.contraseniaLoginInput !== this.usuario[8] &&
          this.correoLoginInput === this.usuario[5]
        ) {
          this.logContraseniaIncorreta=true;
          break;
        }else{
          this.logUError=true;
        }
        
      }
      

      for (let i = 0; i < this.listaARegistrados.length; i++) {
        this.admin = Object.values(this.adminServicio.listaRegistrados[i]);
        if (
          this.correoLoginInput === this.admin[4] &&
          this.contraseniaLoginInput === this.admin[5]
        ) {
          this.seLogeoAdmin=true;
          break;
        } else if (
          this.contraseniaLoginInput !== this.admin[5] &&
          this.correoLoginInput === this.admin[4]
        ) {
          this.logContraseniaIncorreta=true;
  
          break;
        } else{
          this.logAError=true;
          break;
        }
      }
      if(this.seLogeoAdmin){
        this.loginAdminCorrecto();
        this.limpiarFom();
        this.cerrarModal();
      }else if(this.seLogeoUsuario){
        this.loginUserCorrecto();
        this.limpiarFom();
        this.cerrarModal();
      }else if(this.contraseniaLoginInput){
        this.logContraseñaIncorreta();
      }else if(this.logUError && this.logAError){
        
      }

    } else {
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
