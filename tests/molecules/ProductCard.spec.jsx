
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../src/components/molecules/ProductCard';

const productoPrueba = {
  id: 1,
  name: 'Zapatillas deportivas',
  description: 'Zapatillas para correr',
  price: 29990,
  image: '/zapatos.png'
};

describe('Componente ProductCard', () => {

  beforeEach(() => {
    localStorage.clear();
    spyOn(window, 'alert');
  });

  // Verifica que se muestren el nombre y el precio del producto.
  it('debe mostrar el nombre y precio del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={productoPrueba} />
      </MemoryRouter>
    );

    expect(screen.getByText('Zapatillas deportivas')).toBeTruthy();

    // El precio puede estar separado en varios elementos HTML.
    const precio = screen.getByText((contenido, elemento) => {
      return elemento.tagName === 'SPAN' &&
        elemento.textContent.includes('29.990');
    });

    expect(precio).toBeTruthy();
  });

  // Verifica que se muestre la imagen del producto.
  it('debe mostrar la imagen del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={productoPrueba} />
      </MemoryRouter>
    );

    const imagen = screen.getByAltText('Zapatillas deportivas');

    expect(imagen.getAttribute('src')).toBe('/zapatos.png');
  });

  // Verifica que el botón Añadir guarde el producto en el carrito.
  it('debe agregar el producto al carrito', () => {
    render(
      <MemoryRouter>
        <ProductCard product={productoPrueba} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Añadir'));

    const carrito = JSON.parse(localStorage.getItem('carrito'));

    expect(carrito.length).toBe(1);
    expect(carrito[0].id).toBe(1);
    expect(carrito[0].nombre).toBe('Zapatillas deportivas');
    expect(carrito[0].cantidad).toBe(1);
    expect(window.alert).toHaveBeenCalled();
  });

  // Verifica que agregar el mismo producto aumente la cantidad.
  it('debe aumentar la cantidad si el producto ya existe', () => {
    localStorage.setItem('carrito', JSON.stringify([
      {
        id: 1,
        nombre: 'Zapatillas deportivas',
        precio: 29990,
        imagen: '/zapatos.png',
        cantidad: 1
      }
    ]));

    render(
      <MemoryRouter>
        <ProductCard product={productoPrueba} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Añadir'));

    const carrito = JSON.parse(localStorage.getItem('carrito'));

    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(2);
  });

  // Verifica que se muestre el botón para ver los detalles.
  it('debe mostrar el botón para ver los detalles', () => {
    render(
      <MemoryRouter>
        <ProductCard product={productoPrueba} />
      </MemoryRouter>
    );

    expect(screen.getByText('Ver detalles')).toBeTruthy();
  });

});
