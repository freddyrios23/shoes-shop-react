
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../src/components/organims/Navbar';

describe('NavBar', () => {

    // Prueba 1: comprobar que se muestra la marca de la tienda.
    it('debe mostrar el nombre de la tienda', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        expect(screen.getByText('SHOES SHOP')).toBeTruthy();
    });

    // Prueba 2: comprobar que se muestran los enlaces principales.
    it('debe mostrar los enlaces Inicio y Productos', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: 'Inicio' })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Productos' })).toBeTruthy();
    });

    // Prueba 3: comprobar que existe el enlace al carrito.
    it('debe mostrar el enlace al carrito de compras', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        const carrito = screen.getByRole('link', {
            name: 'Carrito de compras'
        });

        expect(carrito.getAttribute('href')).toBe('/cart');
    });

    // Prueba 4: comprobar que el menú de usuario se abre al hacer clic.
    it('debe mostrar las opciones de usuario al hacer clic en la cuenta', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole('button', { name: 'Cuenta de usuario' })
        );

        expect(screen.getByText('Iniciar sesión')).toBeTruthy();
        expect(screen.getByText('Registrarse')).toBeTruthy();
    });

    // Prueba 5: comprobar que el enlace de inicio de sesión funciona.
    it('debe tener el enlace correcto para iniciar sesión', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole('button', { name: 'Cuenta de usuario' })
        );

        const enlace = screen.getByRole('link', {
            name: 'Iniciar sesión'
        });

        expect(enlace.getAttribute('href')).toBe('/login');
    });

    // Prueba 6: comprobar que el menú se cierra al elegir Registrarse.
    it('debe cerrar el menú al hacer clic en Registrarse', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole('button', { name: 'Cuenta de usuario' })
        );

        fireEvent.click(screen.getByText('Registrarse'));

        expect(screen.queryByText('Iniciar sesión')).toBeNull();
        expect(screen.queryByText('Registrarse')).toBeNull();
    });

});
