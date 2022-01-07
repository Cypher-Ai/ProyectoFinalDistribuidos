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
    public class HistorialVentasController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public HistorialVentasController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/HistorialVentas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialVenta>>> GetHistorialVenta()
        {
            return await _context.HistorialVenta.ToListAsync();
        }

        // GET: api/HistorialVentas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HistorialVenta>> GetHistorialVenta(int id)
        {
            var historialVenta = await _context.HistorialVenta.FindAsync(id);

            if (historialVenta == null)
            {
                return NotFound();
            }

            return historialVenta;
        }

        // PUT: api/HistorialVentas/5
     
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistorialVenta(int id, HistorialVenta historialVenta)
        {
            if (id != historialVenta.Id)
            {
                return BadRequest();
            }

            _context.Entry(historialVenta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistorialVentaExists(id))
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

        // POST: api/HistorialVentas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HistorialVenta>> PostHistorialVenta(HistorialVenta historialVenta)
        {
            _context.HistorialVenta.Add(historialVenta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHistorialVenta", new { id = historialVenta.Id }, historialVenta);
        }

        // DELETE: api/HistorialVentas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistorialVenta(int id)
        {
            var historialVenta = await _context.HistorialVenta.FindAsync(id);
            if (historialVenta == null)
            {
                return NotFound();
            }

            _context.HistorialVenta.Remove(historialVenta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HistorialVentaExists(int id)
        {
            return _context.HistorialVenta.Any(e => e.Id == id);
        }
    }
}
