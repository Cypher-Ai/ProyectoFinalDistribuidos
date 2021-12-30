using Api_pizzeria.dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api_pizzeria.Controllers
{
    [Route("api/[controller]")]
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
        [HttpPost("login")]
        public async Task<ActionResult<RespuestaAutentificacion>> Login(CredencialAdmin credencialAdmin)
        {
            var resultado = true;
            if (resultado)
            {
                return await ConstruirToken(credencialAdmin);
            }
            else
            {
                return BadRequest("Login incorrecto");
            }
        }

        private async Task<RespuestaAutentificacion> ConstruirToken(CredencialAdmin credencialAdmin)
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
