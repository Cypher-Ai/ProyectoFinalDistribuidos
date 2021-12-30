using Microsoft.EntityFrameworkCore.Migrations;

namespace Api_pizzeria.Migrations
{
    public partial class Inicial : Migration
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administradores");

            migrationBuilder.DropTable(
                name: "LogUsuario");
        }
    }
}
