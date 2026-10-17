
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../src/components/organims/Footer';

describe('Footer', () => {

    // Prueba 1: comprobar que se muestra el nombre de la tienda.
    it('debe mostrar el nombre de la tienda', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText('SHOES SHOP')).toBeTruthy();
    });

    // Prueba 2: comprobar que se muestra el enlace Contacto.
    it('debe mostrar el enlace Contacto', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: 'Contacto' })).toBeTruthy();
    });

    // Prueba 3: comprobar que se muestra Sobre Nosotros.
    it('debe mostrar el enlace Sobre Nosotros', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: 'Sobre Nosotros' })).toBeTruthy();
    });

    // Prueba 4: comprobar que el enlace de redes sociales apunta a Instagram.
    it('debe tener el enlace correcto de Instagram', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const enlace = screen.getByRole('link', { name: 'Redes Sociales' });

        expect(enlace.getAttribute('href')).toBe(
            'https://www.instagram.com/elarayax'
        );
    });

    // Prueba 5: comprobar que aparecen los derechos de autor.
    it('debe mostrar los derechos de autor', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(
            screen.getByText('© 2026 Shoes Shop. Todos los derechos reservados.')
        ).toBeTruthy();
    });

});
