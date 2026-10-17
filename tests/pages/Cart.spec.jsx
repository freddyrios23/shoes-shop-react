
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Cart from '../../src/pages/Cart';

describe('Cart', () => {

    // Producto de ejemplo para las pruebas.
    const productoPrueba = {
        id: 1,
        nombre: 'Zapatillas Nike',
        precio: 50000,
        imagen: '/img/Adidas.jpg',
        cantidad: 2
    };

    // Limpiamos el carrito antes de cada prueba.
    beforeEach(() => {
        localStorage.removeItem('carrito');
    });

    // Función auxiliar para guardar productos y renderizar el carrito.
    function renderizarCart(productos = []) {
        if (productos.length > 0) {
            localStorage.setItem('carrito', JSON.stringify(productos));
        }

        return render(
            <MemoryRouter initialEntries={['/cart']}>
                <Routes>
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/checkout"
                        element={<h1>Finalizar compra</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    }

    // Prueba 1: mostrar un mensaje si el carrito está vacío.
    it('debe mostrar un mensaje cuando el carrito está vacío', () => {
        renderizarCart();

        expect(
            screen.getByText('El carrito está vacío por ahora.')
        ).toBeTruthy();
    });

    // Prueba 2: mostrar el producto guardado.
    it('debe mostrar los productos del carrito', () => {
        renderizarCart([productoPrueba]);

        expect(
            screen.getByText('Zapatillas Nike')
        ).toBeTruthy();
    });

    // Prueba 3: calcular correctamente el subtotal.
    it('debe calcular el subtotal del producto', () => {
        renderizarCart([productoPrueba]);

        expect(
            screen.getByText('$100000')
        ).toBeTruthy();
    });

    // Prueba 4: calcular correctamente el total.
    it('debe mostrar el total de la compra', () => {
        renderizarCart([productoPrueba]);

        expect(
            screen.getByText('Total: $100000')
        ).toBeTruthy();
    });

    // Prueba 5: aumentar la cantidad del producto.
    it('debe aumentar la cantidad al pulsar +', () => {
        renderizarCart([productoPrueba]);

        fireEvent.click(screen.getByRole('button', { name: '+' }));

        expect(screen.getByText('3')).toBeTruthy();

        const carritoGuardado = JSON.parse(
            localStorage.getItem('carrito')
        );

        expect(carritoGuardado[0].cantidad).toBe(3);
    });

    // Prueba 6: eliminar un producto.
    it('debe eliminar un producto del carrito', () => {
        renderizarCart([productoPrueba]);

        fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));

        expect(
            screen.getByText('El carrito está vacío por ahora.')
        ).toBeTruthy();
    });

    // Prueba 7: vaciar el carrito.
    it('debe vaciar el carrito y eliminar sus datos guardados', () => {
        renderizarCart([productoPrueba]);

        fireEvent.click(screen.getByRole('button', { name: 'Vaciar' }));

        expect(
            screen.getByText('El carrito está vacío por ahora.')
        ).toBeTruthy();

        expect(localStorage.getItem('carrito')).toBeNull();
    });

    // Prueba 8: navegar al checkout.
    it('debe ir al checkout al pulsar Comprar ahora', () => {
        renderizarCart([productoPrueba]);

        fireEvent.click(
            screen.getByRole('button', { name: 'Comprar ahora' })
        );

        expect(
            screen.getByRole('heading', { name: 'Finalizar compra' })
        ).toBeTruthy();
    });

});
