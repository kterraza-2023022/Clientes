//

namespace ApiClientes.Models;
//declarar una clase publica
public class Cliente
{
    //llave primaria//crear la propiedad con acceso publico de lectura y escritura
    public int Id { get; set; }
    //incializa la propiedad con una cadena vacia para evitar valores null
    public string Nombre { get; set; } = string.Empty;

    public string Correo { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;
}