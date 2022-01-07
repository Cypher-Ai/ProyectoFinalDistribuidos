using Microsoft.EntityFrameworkCore.Migrations;

namespace Api_pizzeria.Migrations
{
    public partial class pizzeria : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Administradores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombres = table.Column<string>(type: "varchar(100)", nullable: false),
                    Apellidos = table.Column<string>(type: "varchar(100)", nullable: false),
                    NumeroDni = table.Column<int>(type: "int", nullable: false),
                    Correo = table.Column<string>(type: "varchar(100)", nullable: false),
                    Contrasenia = table.Column<string>(type: "varchar(20)", nullable: false),
                    Logeado = table.Column<string>(type: "varchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administradores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HistorialVenta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Total = table.Column<float>(type: "real", nullable: false),
                    Fecha = table.Column<string>(type: "varchar(14)", nullable: false),
                    Hora = table.Column<string>(type: "varchar(14)", nullable: false),
                    Direccion = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistorialVenta", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LogUsuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombres = table.Column<string>(type: "varchar(100)", nullable: false),
                    Apellidos = table.Column<string>(type: "varchar(100)", nullable: false),
                    NumeroTelefono = table.Column<int>(type: "int", nullable: false),
                    NumeroDni = table.Column<int>(type: "int", nullable: false),
                    Correo = table.Column<string>(type: "varchar(100)", nullable: false),
                    FechaNacimiento = table.Column<string>(type: "varchar(100)", nullable: false),
                    Direccion = table.Column<string>(type: "varchar(100)", nullable: false),
                    Contrasenia = table.Column<string>(type: "varchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogUsuario", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TarjetasCredito",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titular = table.Column<string>(type: "varchar(100)", nullable: false),
                    NumeroTarjeta = table.Column<string>(type: "varchar(16)", nullable: false),
                    FechaExpiracion = table.Column<string>(type: "varchar(14)", nullable: false),
                    CVV = table.Column<string>(type: "varchar(3)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TarjetasCredito", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administradores");

            migrationBuilder.DropTable(
                name: "HistorialVenta");

            migrationBuilder.DropTable(
                name: "LogUsuario");

            migrationBuilder.DropTable(
                name: "TarjetasCredito");
        }
    }
}
