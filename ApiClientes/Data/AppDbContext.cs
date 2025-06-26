// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using ApiClientes.Models;

namespace ApiClientes.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Cliente> Clientes => Set<Cliente>();
}
