import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../../src/pages/About";

describe("About", () => {

    it("debe mostrar el título principal", () => {
        render(<About />);

        expect(
            screen.getByRole("heading", { name: "Sobre Nosotros" })
        ).toBeTruthy();
    });

    it("debe mostrar el título de bienvenida", () => {
        render(<About />);

        expect(
            screen.getByRole("heading", {
                name: "Bienvenidos a Shoes Shop"
            })
        ).toBeTruthy();
    });

    it("debe mostrar las secciones informativas", () => {
        render(<About />);

        expect(
            screen.getByRole("heading", { name: "Nuestra historia" })
        ).toBeTruthy();

        expect(
            screen.getByRole("heading", { name: "Nuestra misión" })
        ).toBeTruthy();

        expect(
            screen.getByRole("heading", { name: "Nuestro compromiso" })
        ).toBeTruthy();
    });

    it("debe mostrar la descripción de la tienda", () => {
        render(<About />);

        expect(
            screen.getByText(/Somos una tienda dedicada a la venta de zapatillas/)
        ).toBeTruthy();
    });

    it("debe mostrar el texto de la historia", () => {
        render(<About />);

        expect(
            screen.getByText(/Nace como una propuesta de tienda online/)
        ).toBeTruthy();
    });

    it("debe mostrar el texto de la misión", () => {
        render(<About />);

        expect(
            screen.getByText(/Ofrecer una experiencia de compra sencilla/)
        ).toBeTruthy();
    });

    it("debe mostrar el texto del compromiso", () => {
        render(<About />);

        expect(
            screen.getByText(/Brindar una navegación clara/)
        ).toBeTruthy();
    });

    it("debe tener el contenedor principal", () => {
        const { container } = render(<About />);

        expect(
            container.querySelector(".about-container")
        ).toBeTruthy();
    });

});
