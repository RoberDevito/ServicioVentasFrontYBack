using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Servicios.Migrations
{
    /// <inheritdoc />
    public partial class testeo2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Precio",
                table: "AppIngredientes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Seccion",
                table: "AppHamburguesas",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Precio",
                table: "AppIngredientes");

            migrationBuilder.DropColumn(
                name: "Seccion",
                table: "AppHamburguesas");
        }
    }
}
