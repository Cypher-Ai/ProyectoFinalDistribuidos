using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api_pizzeria;
using Api_pizzeria.Models;

namespace Api_pizzeria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogUsuariosController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public LogUsuariosController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LogUsuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LogUsuario>>> GetLogUsuario()
        {
            return await _context.LogUsuario.ToListAsync();
        }

        // GET: api/LogUsuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LogUsuario>> GetLogUsuario(int id)
        {
            var logUsuario = await _context.LogUsuario.FindAsync(id);

            if (logUsuario == null)
            {
                return NotFound();
            }

            return logUsuario;
        }

        // PUT: api/LogUsuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLogUsuario(int id, LogUsuario logUsuario)
        {
            if (id != logUsuario.Id)
            {
                return BadRequest();
            }

            _context.Entry(logUsuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LogUsuarioExists(id))
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

        // POST: api/LogUsuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LogUsuario>> PostLogUsuario(LogUsuario logUsuario)
        {
            _context.LogUsuario.Add(logUsuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLogUsuario", new { id = logUsuario.Id }, logUsuario);
        }

        // DELETE: api/LogUsuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLogUsuario(int id)
        {
            var logUsuario = await _context.LogUsuario.FindAsync(id);
            if (logUsuario == null)
            {
                return NotFound();
            }

            _context.LogUsuario.Remove(logUsuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LogUsuarioExists(int id)
        {
            return _context.LogUsuario.Any(e => e.Id == id);
        }
    }
}
