
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../src/pages/Home';

describe('Home', () => {

    // Función auxiliar para renderizar la página.
    function renderizarHome() {
        return render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
    }

    // Prueba 1: comprobar que se muestra el título principal.
    it('debe mostrar el título de bienvenida', () => {
        renderizarHome();

        expect(
            screen.getByRole('heading', {
                name: 'Bienvenidos a Shoes Shop'
            })
        ).toBeTruthy();
    });

    // Prueba 2: comprobar que se muestra la descripción.
    it('debe mostrar la descripción de la tienda', () => {
        renderizarHome();

        expect(
            screen.getByText(
                'Tu estilo, tus zapatillas. Encuentra el par perfecto para cada ocasión.'
            )
        ).toBeTruthy();
    });

    // Prueba 3: comprobar que aparece el título de productos destacados.
    it('debe mostrar el título Productos destacados', () => {
        renderizarHome();

        expect(
            screen.getByRole('heading', {
                name: 'Productos destacados'
            })
        ).toBeTruthy();
    });

    // Prueba 4: comprobar que se muestran solo tres productos.
    it('debe mostrar tres productos destacados', () => {
        renderizarHome();

        expect(screen.getAllByRole('img').length).toBe(3);
    });

});
