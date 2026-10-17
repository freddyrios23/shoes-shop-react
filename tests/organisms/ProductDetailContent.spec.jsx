
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductDetailContent from '../../src/components/organims/ProductDetailContent';

// Producto de ejemplo para las pruebas.
const productoPrueba = {
    id: 1,
    nombre: 'Zapatillas Urbanas',
    precio: 29990,
    descripcion: 'Zapatillas cómodas para uso diario.',
    imagen: '/imagenes/zapatillas.jpg'
};

// Función auxiliar para renderizar el componente con Router.
function renderizarComponente(producto = productoPrueba) {
    return render(
        <MemoryRouter>
            <ProductDetailContent producto={producto} />
        </MemoryRouter>
    );
}

describe('ProductDetailContent', () => {

    // Limpiar el carrito antes de cada prueba.
    beforeEach(() => {
        localStorage.removeItem('carrito');
    });

    // Prueba 1: comprobar que aparece el nombre del producto.
    it('debe mostrar el nombre del producto', () => {
        renderizarComponente();

        expect(screen.getByText('Zapatillas Urbanas')).toBeTruthy();
    });

    // Prueba 2: comprobar que aparece el precio.
    it('debe mostrar el precio del producto', () => {
        renderizarComponente();

        expect(screen.getByText('$29.990')).toBeTruthy();
    });

    // Prueba 3: comprobar que aparece la descripción.
    it('debe mostrar la descripción del producto', () => {
        renderizarComponente();

        expect(
            screen.getByText('Zapatillas cómodas para uso diario.')
        ).toBeTruthy();
    });

    // Prueba 4: comprobar la imagen y su texto alternativo.
    it('debe mostrar la imagen del producto', () => {
        renderizarComponente();

        const imagen = screen.getByRole('img', {
            name: 'Zapatillas Urbanas'
        });

        expect(imagen.getAttribute('src')).toBe('/imagenes/zapatillas.jpg');
    });

    // Prueba 5: comprobar que existe el botón para añadir al carrito.
    it('debe mostrar el botón Añadir al carrito', () => {
        renderizarComponente();

        expect(
            screen.getByRole('button', { name: 'Añadir al carrito' })
        ).toBeTruthy();
    });

    // Prueba 6: comprobar que el producto se agrega al carrito.
    it('debe agregar el producto al carrito', () => {
        spyOn(window, 'alert');

        renderizarComponente();

        fireEvent.click(
            screen.getByRole('button', { name: 'Añadir al carrito' })
        );

        const carrito = JSON.parse(localStorage.getItem('carrito'));

        expect(carrito.length).toBe(1);
        expect(carrito[0].id).toBe(1);
        expect(carrito[0].cantidad).toBe(1);
        expect(window.alert).toHaveBeenCalled();
    });

    // Prueba 7: comprobar que aumenta la cantidad si el producto ya existe.
    it('debe aumentar la cantidad del producto existente', () => {
        spyOn(window, 'alert');

        localStorage.setItem(
            'carrito',
            JSON.stringify([{ ...productoPrueba, cantidad: 1 }])
        );

        renderizarComponente();

        fireEvent.click(
            screen.getByRole('button', { name: 'Añadir al carrito' })
        );

        const carrito = JSON.parse(localStorage.getItem('carrito'));

        expect(carrito.length).toBe(1);
        expect(carrito[0].cantidad).toBe(2);
    });

});
