
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Cart from '../../src/pages/Cart';

describe('Cart', () => {
    const productoPrueba = {
        id: 1,
        nombre: 'Zapatillas Nike',
        precio: 50000,
        imagen: '/img/Adidas.jpg',
        cantidad: 2
    };

    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem(
            'usuarioActivo',
            JSON.stringify({ nombre: 'Usuario de prueba' })
        );
    });

    afterEach(() => {
        cleanup();
        localStorage.clear();
    });

    function renderizarCart(productos = []) {
        localStorage.setItem('carrito', JSON.stringify(productos));

        return render(
            <MemoryRouter initialEntries={['/cart']}>
                <Routes>
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/login"
                        element={<h1>Iniciar sesión</h1>}
                    />
                    <Route
                        path="/checkout"
                        element={<h1>Finalizar compra</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    }

    it('debe mostrar un mensaje cuando el carrito está vacío', () => {
        renderizarCart();

        expect(
            screen.getByText('El carrito está vacío por ahora.')
        ).toBeTruthy();
    });

    it('debe mostrar los productos del carrito', () => {
        renderizarCart([productoPrueba]);

        expect(screen.getByText('Zapatillas Nike')).toBeTruthy();
    });

    it('debe calcular el subtotal del producto', () => {
        renderizarCart([productoPrueba]);

        expect(screen.getByText('$100000')).toBeTruthy();
    });

    it('debe mostrar el total de la compra', () => {
        renderizarCart([productoPrueba]);

        expect(screen.getByText('Total: $100000')).toBeTruthy();
    });

    it('debe aumentar la cantidad al pulsar +', () => {
        renderizarCart([productoPrueba]);

        fireEvent.click(screen.getByRole('button', { name: '+' }));

        expect(screen.getByText('3')).toBeTruthy();

        const carritoGuardado = JSON.parse(
            localStorage.getItem('carrito')
        );

        expect(carritoGuardado[0].cantidad).toBe(3);
    });

    it('debe eliminar un producto del carrito', () => {
        renderizarCart([productoPrueba]);

        fireEvent.click(
            screen.getByRole('button', { name: 'Eliminar' })
        );

        expect(
            screen.getByText('El carrito está vacío por ahora.')
        ).toBeTruthy();
    });

    it('debe vaciar el carrito y eliminar sus datos guardados', () => {
        renderizarCart([productoPrueba]);

        fireEvent.click(screen.getByRole('button', { name: 'Vaciar' }));

        expect(
            screen.getByText('El carrito está vacío por ahora.')
        ).toBeTruthy();

        expect(localStorage.getItem('carrito')).toBeNull();
    });

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
