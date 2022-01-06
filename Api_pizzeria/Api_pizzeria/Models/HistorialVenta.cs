using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api_pizzeria.Models
{
    public class HistorialVenta
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public float Total { get; set; }


        [Required]
        [Column(TypeName = "varchar(14)")]
        public string Fecha { get; set; }


        [Required]
        [Column(TypeName = "varchar(14)")]
        public string Hora { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Direccion { get; set; }
    }
}
