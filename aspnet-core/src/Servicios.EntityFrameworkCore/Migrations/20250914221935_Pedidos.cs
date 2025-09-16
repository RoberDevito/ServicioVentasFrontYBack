using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Servicios.Migrations
{
    /// <inheritdoc />
    public partial class Pedidos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppPedidos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ClienteNombre = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    ClienteEmail = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: true),
                    ClienteTelefono = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    Calle = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    Piso = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    Comentario = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true),
                    FormaPago = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    Total = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Estado = table.Column<int>(type: "integer", nullable: false),
                    ExtraProperties = table.Column<string>(type: "text", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPedidos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppPedidoItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PedidoId = table.Column<Guid>(type: "uuid", nullable: false),
                    HamburguesaId = table.Column<Guid>(type: "uuid", nullable: false),
                    Cantidad = table.Column<int>(type: "integer", nullable: false),
                    PrecioUnitario = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ExtraProperties = table.Column<string>(type: "text", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPedidoItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppPedidoItems_AppHamburguesas_HamburguesaId",
                        column: x => x.HamburguesaId,
                        principalTable: "AppHamburguesas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppPedidoItems_AppPedidos_PedidoId",
                        column: x => x.PedidoId,
                        principalTable: "AppPedidos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppPedidoItems_HamburguesaId",
                table: "AppPedidoItems",
                column: "HamburguesaId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPedidoItems_PedidoId",
                table: "AppPedidoItems",
                column: "PedidoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppPedidoItems");

            migrationBuilder.DropTable(
                name: "AppPedidos");
        }
    }
}
