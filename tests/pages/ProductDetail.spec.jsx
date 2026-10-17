
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from '../../src/pages/ProductDetail';
import productos from '../../src/data/products';

describe('ProductDetail', () => {

    // Función auxiliar para probar una URL con el ID del producto.
    function renderizarDetalle(id) {
        return render(
            <MemoryRouter initialEntries={[`/products/${id}`]}>
                <Routes>
                    <Route
                        path="/products/:id"
                        element={<ProductDetail />}
                    />
                </Routes>
            </MemoryRouter>
        );
    }

    // Prueba 1: mostrar el producto cuando existe su ID.
    it('debe mostrar el detalle de un producto existente', () => {
        const producto = productos[0];

        renderizarDetalle(producto.id);

        expect(
            screen.getByText(producto.nombre)
        ).toBeTruthy();
    });

    // Prueba 2: mostrar el mensaje cuando el producto no existe.
    it('debe mostrar Producto no encontrado si el ID no existe', () => {
        renderizarDetalle('id-inexistente-xyz');

        expect(
            screen.getByRole('heading', {
                name: 'Producto no encontrado'
            })
        ).toBeTruthy();
    });

    // Prueba 3: mostrar el botón para añadir al carrito.
    it('debe mostrar el botón para añadir al carrito', () => {
        const producto = productos[0];

        renderizarDetalle(producto.id);

        expect(
            screen.getByRole('button', {
                name: /añadir al carrito/i
            })
        ).toBeTruthy();
    });

    // Prueba 4: mostrar el botón para volver a los productos.
    it('debe mostrar el botón para volver a productos', () => {
        const producto = productos[0];

        renderizarDetalle(producto.id);

        expect(
            screen.getByRole('button', {
                name: /volver a productos/i
            })
        ).toBeTruthy();
    });

});
