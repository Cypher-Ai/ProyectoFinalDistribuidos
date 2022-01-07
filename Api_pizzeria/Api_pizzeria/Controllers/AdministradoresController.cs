using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api_pizzeria;
using Api_pizzeria.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Api_pizzeria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class AdministradoresController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public AdministradoresController(AplicationDbContext context)
        {
            _context = context;
            
        }

        // GET: api/Administradores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Administradores>>> GetAdministradores()
        {
            return await _context.Administradores.ToListAsync();
        }
        
        [HttpGet("login/{correo}/{contrasenia?}")]
        public async Task<ActionResult<Administradores>> GetLogUsuario(string correo, string contrasenia)
        {
            var administrador = await _context.Administradores.FirstOrDefaultAsync(x => x.Correo.Equals(correo));

            if (administrador == null)

                return NotFound();

            else if (administrador.Contrasenia == contrasenia)
            {
                return administrador;
            }
            else
            {
                return BadRequest();
            }

        }
        // GET: api/Administradores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Administradores>> GetAdministradores(int id)
        {
            var administradores = await _context.Administradores.FindAsync(id);

            if (administradores == null)
            {
                return NotFound();
            }

            return administradores;
        }

        // PUT: api/Administradores/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdministradores(int id, Administradores administradores)
        {
            if (id != administradores.Id)
            {
                return BadRequest();
            }

            _context.Entry(administradores).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdministradoresExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Administradores
 
        [HttpPost]
        public async Task<ActionResult<Administradores>> PostAdministradores(Administradores administradores)
        {
            _context.Administradores.Add(administradores);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdministradores", new { id = administradores.Id }, administradores);
        }

        // DELETE: api/Administradores/5

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdministradores(int id)
        {
            var administradores = await _context.Administradores.FindAsync(id);
            if (administradores == null)
            {
                return NotFound();
            }

            _context.Administradores.Remove(administradores);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool AdministradoresExists(int id)
        {
            return _context.Administradores.Any(e => e.Id == id);
        }

    
    }

}

/*
     [AllowAnonymous]
     [HttpPost("auth")]
     public async Task<ActionResult<RespuestaAutentificacion>> Login (CredencialAdmin credencialAdmin)
     {

         var resultado = true;
         /*
         var administrador = await context.Administradores.FirstOrDefaultAsync(x => x.Correo.Equals(credencialAdmin.Correo));
         if (administrador==null)
         {
             resultado = false;
         }
         else if (administrador.Contrasenia == credencialAdmin.Contrasenia)
         {
             resultado = true;
         }


         if (resultado)
         {
             return ConstruirToken(credencialAdmin);
         }
         else
         {
             return BadRequest("Login incorrecto");
         }

     }

     private RespuestaAutentificacion ConstruirToken(CredencialAdmin credencialAdmin)
     {
         var claims = new List<Claim>()
         {
             new Claim("Correo", credencialAdmin.Correo)
         };

         var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llavejwt"]));
         var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);
         var expiracion = DateTime.UtcNow.AddDays(1);

         var securityToken = new JwtSecurityToken(issuer: null, audience: null,claims: claims,
             expires: expiracion, signingCredentials: creds);

         return new RespuestaAutentificacion()
         {
             Token = new JwtSecurityTokenHandler().WriteToken(securityToken),
             Expiracion = expiracion
         };
     }
      */
