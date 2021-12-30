using Api_pizzeria.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_pizzeria
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options)
        {

        }  
        public DbSet<LogUsuario> LogUsuario { get; set; }
        public DbSet<Administradores> Administradores { get; set; }

    }
    
}
