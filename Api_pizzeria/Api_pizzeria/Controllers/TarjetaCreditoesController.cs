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
    public class TarjetaCreditoesController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public TarjetaCreditoesController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TarjetaCreditoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TarjetaCredito>>> GetTarjetasCredito()
        {
            return await _context.TarjetasCredito.ToListAsync();
        }

        // GET: api/TarjetaCreditoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TarjetaCredito>> GetTarjetaCredito(int id)
        {
            var tarjetaCredito = await _context.TarjetasCredito.FindAsync(id);

            if (tarjetaCredito == null)
            {
                return NotFound();
            }

            return tarjetaCredito;
        }

        // PUT: api/TarjetaCreditoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarjetaCredito(int id, TarjetaCredito tarjetaCredito)
        {
            if (id != tarjetaCredito.Id)
            {
                return BadRequest();
            }

            _context.Entry(tarjetaCredito).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TarjetaCreditoExists(id))
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

        // POST: api/TarjetaCreditoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TarjetaCredito>> PostTarjetaCredito(TarjetaCredito tarjetaCredito)
        {
            _context.TarjetasCredito.Add(tarjetaCredito);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTarjetaCredito", new { id = tarjetaCredito.Id }, tarjetaCredito);
        }

        // DELETE: api/TarjetaCreditoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarjetaCredito(int id)
        {
            var tarjetaCredito = await _context.TarjetasCredito.FindAsync(id);
            if (tarjetaCredito == null)
            {
                return NotFound();
            }

            _context.TarjetasCredito.Remove(tarjetaCredito);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TarjetaCreditoExists(int id)
        {
            return _context.TarjetasCredito.Any(e => e.Id == id);
        }
    }
}
