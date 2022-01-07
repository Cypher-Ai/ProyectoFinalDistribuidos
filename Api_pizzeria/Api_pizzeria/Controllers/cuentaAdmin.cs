using Api_pizzeria.dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api_pizzeria.Controllers
{
    [Route("api/cuentaAdmin")]
    [ApiController]
   
    public class cuentaAdmin : ControllerBase
    {
        private readonly AplicationDbContext context;
        private readonly IConfiguration configuration;
        public cuentaAdmin(AplicationDbContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }
   [HttpPost("auth")]
        public async Task<ActionResult<RespuestaAutentificacion>> Login (CredencialAdmin credencialAdmin)
        {
            var resultado = false;
            
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

        private RespuestaAutentificacion ConstruirToken([FromBody] CredencialAdmin credencialAdmin)
        {
            var claims = new List<Claim>()
            {
                new Claim("Correo", credencialAdmin.Correo)
            };

            var llave = new SymmetricSecurityKey(Encoding.UTF8.
GetBytes(configuration["llavejwt"]));
            var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);
            var expiracion = DateTime.UtcNow.AddDays(1);

            var securityToken = new JwtSecurityToken(issuer: null, audience: null,
claims: claims,
                expires: expiracion, signingCredentials: creds);

            return new RespuestaAutentificacion()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                Expiracion = expiracion
            };
        }

    }
}
