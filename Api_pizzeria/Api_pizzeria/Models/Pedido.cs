using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api_pizzeria.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int numeroCliente { get; set; }

        [Required]
        public int precioPedido { get; set; }

        [Required]
        public String fechaPedido { get; set; }

        [Required]
        public String horaPedido { get; set; }

        [Required]
        public int nomnbrePedido { get; set; }

        [Required]
        public List<string> Items { get; set; }
    }
}
