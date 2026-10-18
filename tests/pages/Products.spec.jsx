
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from '../../src/pages/Products';

describe('Products', () => {

    // Función auxiliar para renderizar la página.
    function renderizarProducts() {
        return render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );
    }

    // Prueba 1: comprobar que se muestra el título.
    it('debe mostrar el título Productos', () => {
        renderizarProducts();

        expect(
            screen.getByRole('heading', { name: 'Productos' })
        ).toBeTruthy();
    });

    // Prueba 2: comprobar que se muestra el campo de búsqueda.
    it('debe mostrar la barra de búsqueda', () => {
        renderizarProducts();

        expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);
    });

    // Prueba 3: comprobar que se muestran los productos inicialmente.
    it('debe mostrar productos al cargar la página', () => {
        renderizarProducts();

        expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
    });

    // Prueba 4: comprobar que se puede escribir en la búsqueda.
    it('debe permitir escribir en el campo de búsqueda', () => {
        renderizarProducts();

        const campoBusqueda = screen.getAllByRole('textbox')[0];

        fireEvent.change(campoBusqueda, {
            target: { value: 'Nike' }
        });

        expect(campoBusqueda.value).toBe('Nike');
    });

    // Prueba 5: comprobar que una búsqueda sin coincidencias
    // muestra el mensaje correspondiente.

    it('debe mostrar un mensaje si no hay productos coincidentes', () => {
        renderizarProducts();

        const campoBusqueda = screen.getByPlaceholderText(
            'Buscar productos...'
        );

        fireEvent.change(campoBusqueda, {
            target: { value: 'producto-inexistente-xyz' }
        });

        fireEvent.click(
            screen.getByRole('button', { name: 'Buscar' })
        );

        expect(
            screen.getByText('No se encontraron productos.')
        ).toBeTruthy();
    });


});
