import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';


import Swal from 'sweetalert2';

declare var jQuery: any;
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  //variables necesarias para el formulario de registro
  titulo: string = 'Registro de datos';
  submitted: boolean = false;
  formRegistro!: FormGroup;
  listUsuario: any[] = [];
  //cuantas ya registradas
  //para ubicar registros de correo, numeros de telefono y dni, que ya se registraron anteriormente
  private listaURegistrados: Usuario[];
  private usuario: any[];

  //constructor
  constructor(
    private fb: FormBuilder,
    private usuarioServicio: UsuarioServicio
  ) {
    
    this.formRegistro = this.fb.group(
      {
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        telefono: ['', [Validators.required, Validators.min(0)]],
        nroDni: ['', [Validators.required, Validators.min(0)]],
        fechaNacimiento: ['', [Validators.required]],
        direccionInputForm: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        contrasenia: [
          null,
          [
            Validators.required,
            Validators.pattern('(?=.*[a-z])(?=.*[0-9])[a-zd].{8,}'),
          ],
        ],
        cContrasenia: [null, [Validators.required]],
      },
      {
        validators: this.MustMatch('contrasenia', 'cContrasenia'),
      }
    );
  }

  ngOnInit() {
    this.usuarioServicio.usuariosRegistrados();
  }
  registrarPersona() {
    this.usuarioServicio.usuariosRegistrados();

    if (this.formRegistro.valid) {
      this.listaURegistrados = Object.values(this.usuarioServicio.listaRegistrados);
      for (let i = 0; i < this.listaURegistrados.length; i++) {
        console.log("entro en for");
        this.usuario = Object.values(this.usuarioServicio.listaRegistrados[i]);
        if (this.formRegistro.get('correo')?.value=== this.usuario[5]) {
          this.correoYaRegsitrado();
          break;
        } else if (parseInt(this.formRegistro.get('nroDni')?.value) === this.usuario[4]) {
          this.nroDniYaRegistrado();
          break;
        } else if (parseInt(this.formRegistro.get('telefono')?.value) === this.usuario[3]) {
          this.telefonoYaRegistrado();
          break;
        } else {
          
          //en esta parte se implementara el servicio
          const usuario: Usuario = {
            Id: 0,
            Nombres: this.formRegistro.get('nombres')?.value,
            Apellidos: this.formRegistro.get('apellidos')?.value,
            Correo: this.formRegistro.get('correo')?.value,
            NumeroTelefono: parseInt(this.formRegistro.get('telefono')?.value),
            NumeroDni: parseInt(this.formRegistro.get('nroDni')?.value),
            FechaNacimiento: this.formRegistro.get('fechaNacimiento')?.value,
            Direccion: this.formRegistro.get('direccionInputForm')?.value,
            Contrasenia: this.formRegistro.get('contrasenia')?.value,
          };
          this.usuarioServicio.guardarUsuario(usuario).subscribe((data) => {});
          this.registroCompletado();
          //limpiamos el formulario
          this.limpiarFom();
          //cerramos modal
          this.cerrarModal();
          break;
        }
      }
    } else {
      this.registroErrado();
    }
  }
  get f() {
    return this.formRegistro.controls;
  }

  public control(name: string) {
    return this.formRegistro.get(name);
  }

  //metodo para subir formulario
  public onSubmit() {
    this.submitted = true;
    if (this.formRegistro.invalid) {
      return;
    }
  }
  //posiblemente ya no sirva
  //metodo para limpiar el formulario
  private limpiarFom() {
    this.formRegistro.reset();
  }

  //validación mustMucht que verifica que las ingreso de contraseña correcta
  //contraseñas correctamente ingresadas
  MustMatch(contrasenia: string, confirmarContrasenia: string) {
    return (formRegistro: FormGroup) => {
      const control = formRegistro.controls[contrasenia];
      const machingControl = formRegistro.controls[confirmarContrasenia];
      if (machingControl.errors && !machingControl.errors.MustMatch) {
        return;
      }
      if (control.value !== machingControl.value) {
        machingControl.setErrors({ MustMatch: true });
      } else {
        machingControl.setErrors(null);
      }
    };
  }

  //mensajes de registros completados
  private registroCompletado() {
    Swal.fire('Ya tienes cuenta!☜(ﾟヮﾟ☜)', '🤡Buen trabajo!🤡', 'success');
  }

  registroErrado() {
    Swal.fire({
      title: 'Llene bien todos los campos',
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
  //Regsitrado? por si acaso
  private correoYaRegsitrado() {
    Swal.fire(
      'Tu correo ya ha sido registrado anteriormente!!! つ ◕_◕ ༽つ',
      '¿Ingresaste bien tu cuenta de correo?\n 🤡Intenta nuevamente🤡',
      'warning'
    );
  }
  private telefonoYaRegistrado() {
    Swal.fire(
      'Tu número de telefono ya ha sido registrado anteriormente!!! つ ◕_◕ ༽つ',
      '¿Ingresaste bien tu número de telefono?\n 🤡Intenta nuevamente🤡',
      'warning'
    );
  }
  private nroDniYaRegistrado() {
    Swal.fire(
      'Tu número de DNI ya ha sido registrado anteriormente!!! つ ◕_◕ ༽つ',
      '¿Ingresaste bien tu número de DNI?\n 🤡Intenta nuevamente🤡',
      'warning'
    );
  }
  //Para cuando el registro sea terminado
  private cerrarModal() {
    jQuery('#registroDatosCliente').modal('hide');
  }
}
