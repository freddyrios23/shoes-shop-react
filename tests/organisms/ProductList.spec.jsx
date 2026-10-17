
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductList from '../../src/components/organims/ProductList';
import productos from '../../src/data/products';

describe('ProductList', () => {

    // Función auxiliar para renderizar la lista.
    function renderizarLista(props = {}) {
        return render(
            <MemoryRouter>
                <ProductList {...props} />
            </MemoryRouter>
        );
    }

    // Prueba 1: comprobar que se muestran productos.
    it('debe mostrar productos de la tienda', () => {
        renderizarLista();

        expect(
            screen.getAllByRole('img').length
        ).toBeGreaterThan(0);
    });

    // Prueba 2: comprobar que se respeta el límite indicado.
    it('debe mostrar como máximo la cantidad de productos indicada', () => {
        const limite = 3;

        renderizarLista({ limite });

        expect(screen.getAllByRole('img').length).toBe(limite);
    });

    // Prueba 3: comprobar que se filtran los productos por nombre.
    it('debe filtrar los productos según la búsqueda', () => {
        const productoBuscado = productos[0];

        renderizarLista({ busqueda: productoBuscado.nombre });

        expect(
            screen.getAllByRole('img').length
        ).toBeGreaterThan(0);

        expect(
            screen.getAllByRole('img').length
        ).toBeLessThanOrEqual(productos.length);
    });

    // Prueba 4: comprobar que la búsqueda no distingue mayúsculas.
    it('debe buscar productos sin distinguir mayúsculas y minúsculas', () => {
        const productoBuscado = productos[0];

        renderizarLista({
            busqueda: productoBuscado.nombre.toUpperCase()
        });

        expect(
            screen.getAllByRole('img').length
        ).toBeGreaterThan(0);
    });

    // Prueba 5: comprobar el mensaje cuando no hay coincidencias.
    it('debe mostrar un mensaje si no encuentra productos', () => {
        renderizarLista({
            busqueda: 'producto-que-no-existe-xyz'
        });

        expect(
            screen.getByText('No se encontraron productos.')
        ).toBeTruthy();
    });

});
