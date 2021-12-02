import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from 'src/app/pedido.model';
import { Usuario } from 'src/app/usuario.model';
import { UsuarioServicio } from 'src/app/usuario.service';
import Swal from 'sweetalert2';
import { Persona } from '../../persona.model';
import { PersonaServicio } from '../../persona.service';
declare var jQuery: any;
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  titulo: string = 'Registro de datos';
  submitted: boolean = false;
  nombresInput!: string;
  apellidosInput!: string;
  numeroTelefonoInput!: number;
  numeroDniInput!: number;
  correoInput!: string;
  fechaNacimientoInput!: string;
  contraseniaInput!: string;
  confimarContraseniaInput!: string;
  direccionInput!: string;
  persona!: Persona;
  personas: Persona[] = [];
  formRegistro!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personaServicio: PersonaServicio,
    private usuarioServicio:UsuarioServicio

  ) {
    this.personas = personaServicio.personas;
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

  ngOnInit() {}
  //método para las validaciones respectivas

  get f() {
    return this.formRegistro.controls;
  }
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

  public control(name: string) {
    return this.formRegistro.get(name);
  }

  registrarPersona() {
    if (this.formRegistro.valid) {
 
      this.persona = new Persona(
        this.personaServicio.generarId(),
        this.nombresInput,
        this.apellidosInput,
        this.numeroTelefonoInput,
        this.numeroDniInput,
        this.correoInput,
        this.fechaNacimientoInput,
        this.direccionInput,
        this.contraseniaInput,
        []
      );
      //verificar correo
      if (
        !this.personaServicio.correoRegistradoAnteriormente(this.persona) &&
        !this.personaServicio.telefonoAnteriormenteRegistrado(this.persona) &&
        !this.personaServicio.numDniRegistradoAnteriormente(this.persona)
      ) {
        this.registroCompletado();
        //ingresamos los datos de la persona al servicio
        this.personaServicio.personas.push(this.persona);

        //en esta parte se implementara el servicio
        const usuario: Usuario={
          Id:0,
          Nombres: this.formRegistro.get('nombres')?.value,
          Apellidos: this.formRegistro.get('apellidos')?.value,
          Correo: this.formRegistro.get('correo')?.value,
          NumeroTelefono: parseInt(this.formRegistro.get('telefono')?.value),
          NumeroDni:parseInt( this.formRegistro.get('nroDni')?.value),
          FechaNacimiento: this.formRegistro.get('fechaNacimiento')?.value,
          Direccion: this.formRegistro.get('direccionInputForm')?.value,
          Contrasenia: this.formRegistro.get('contrasenia')?.value,
        }
        console.log(usuario.Apellidos);
        this.usuarioServicio.guardarUsuario(usuario).subscribe(
          data=>{ console.log("guardado con exito")
          }
        );
        //limpiamos el formulario
        this.limpiarFom();
        //cerramos modal
        this.cerrarModal();
      } else if (
        this.personaServicio.correoRegistradoAnteriormente(this.persona)
      ) {
        this.correoYaRegsitrado();
      }
      //verificar número de telefono
      else if (
        this.personaServicio.telefonoAnteriormenteRegistrado(this.persona)
      ) {
        this.telefonoYaRegistrado();
        //verficar número de DNI
      } else if (
        this.personaServicio.numDniRegistradoAnteriormente(this.persona)
      ) {
        this.nroDniYaRegistrado();
      } else {
      }
    } else {
      this.registroErrado();
    }
  }

   //metodo para subir formulario
   public onSubmit() {
    this.submitted = true;
    if (this.formRegistro.invalid) {
      return;
    }
  }
  //metodo para limpiar el formulario
  private limpiarFom() {
    this.formRegistro.reset();
  }

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