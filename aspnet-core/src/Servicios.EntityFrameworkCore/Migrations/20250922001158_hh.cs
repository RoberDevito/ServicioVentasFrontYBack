using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Servicios.Migrations
{
    /// <inheritdoc />
    public partial class hh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppIngredientes_AppHamburguesas_HamburguesasId",
                table: "AppIngredientes");

            migrationBuilder.RenameColumn(
                name: "HamburguesasId",
                table: "AppIngredientes",
                newName: "HamburguesaId");

            migrationBuilder.RenameIndex(
                name: "IX_AppIngredientes_HamburguesasId",
                table: "AppIngredientes",
                newName: "IX_AppIngredientes_HamburguesaId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppIngredientes_AppHamburguesas_HamburguesaId",
                table: "AppIngredientes",
                column: "HamburguesaId",
                principalTable: "AppHamburguesas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppIngredientes_AppHamburguesas_HamburguesaId",
                table: "AppIngredientes");

            migrationBuilder.RenameColumn(
                name: "HamburguesaId",
                table: "AppIngredientes",
                newName: "HamburguesasId");

            migrationBuilder.RenameIndex(
                name: "IX_AppIngredientes_HamburguesaId",
                table: "AppIngredientes",
                newName: "IX_AppIngredientes_HamburguesasId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppIngredientes_AppHamburguesas_HamburguesasId",
                table: "AppIngredientes",
                column: "HamburguesasId",
                principalTable: "AppHamburguesas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
