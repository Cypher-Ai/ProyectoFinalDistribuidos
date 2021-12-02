using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api_pizzeria.Models
{
    public class LogUsuario
    {
        [Key]
        public int Id { get; set; }


        [Required]
        [Column(TypeName="varchar(100)")]
        public string Nombres { get; set; }


        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Apellidos { get; set; }


        [Required]
        [Column(TypeName = "int")]
        public int NumeroTelefono { get; set; }


        [Required]
        [Column(TypeName = "int")]
        public int NumeroDni { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Correo { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string FechaNacimiento { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Direccion { get; set; }

        [Required]
        [Column(TypeName = "varchar(20)")]
        public string Contrasenia { get; set; }


    }
}
