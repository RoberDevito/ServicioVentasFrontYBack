using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Servicios.Migrations
{
    /// <inheritdoc />
    public partial class segunda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppHamburguesas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Nombre = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    Descripcion = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    Precio = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ImagenUrl = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppHamburguesas", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppHamburguesas");
        }
    }
}
