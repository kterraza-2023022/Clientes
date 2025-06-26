// Controllers/ClientesController.cs
using Microsoft.AspNetCore.Mvc;
using ApiClientes.Data;
using ApiClientes.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiClientes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetClientes()
    {
        try
        {
            var clientes = await _context.Clientes.ToListAsync();
            return Ok(new { success = true, clientes });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error al obtener clientes:", ex.Message);
            return StatusCode(500, new { success = false, message = "Error interno del servidor", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCliente(int id)
    {
        try
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
                return NotFound(new { success = false, message = "Cliente no encontrado" });

            return Ok(new { success = true, cliente });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error al obtener cliente:", ex.Message);
            return StatusCode(500, new { success = false, message = "Error interno del servidor", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateCliente([FromForm] Cliente cliente)
    {
        try
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCliente), new { id = cliente.Id }, new { success = true, message = "Cliente creado", cliente });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error al crear cliente:", ex.Message);
            return StatusCode(500, new { success = false, message = "Error interno del servidor", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCliente(int id, [FromForm] Cliente data)
    {
        try
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
                return NotFound(new { success = false, message = "Cliente no encontrado" });

            // Asignar cambios
            cliente.Nombre = data.Nombre;
            cliente.Correo = data.Correo;
            cliente.Telefono = data.Telefono;
            // Otros campos...

            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Cliente actualizado", cliente });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error al actualizar cliente:", ex.Message);
            return StatusCode(500, new { success = false, message = "Error interno del servidor", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCliente(int id)
    {
        try
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
                return NotFound(new { success = false, message = "Cliente no encontrado" });

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Cliente eliminado" });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error al eliminar cliente:", ex.Message);
            return StatusCode(500, new { success = false, message = "Error interno del servidor", error = ex.Message });
        }
    }
}
