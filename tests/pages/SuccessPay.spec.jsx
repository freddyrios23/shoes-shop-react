
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import SuccessPay from '../../src/pages/SuccessPay';

function RutaActual() {
  const location = useLocation();
  return <p>Ruta actual: {location.pathname}</p>;
}

describe('SuccessPay', () => {
  function renderSuccessPay() {
    return render(
      <MemoryRouter initialEntries={['/success']}>
        <Routes>
          <Route path="/success" element={<SuccessPay />} />
          <Route path="/products" element={<RutaActual />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('debe mostrar el mensaje de compra exitosa', () => {
    renderSuccessPay();

    expect(
      screen.getByRole('heading', {
        name: '¡Se ha realizado la compra con éxito!'
      })
    ).toBeTruthy();
  });

  it('debe mostrar el mensaje de agradecimiento', () => {
    renderSuccessPay();

    expect(
      screen.getByText(
        'Gracias por comprar en Shoes Shop. Tu pedido ya está siendo procesado.'
      )
    ).toBeTruthy();
  });

  it('debe mostrar el botón para volver a la tienda', () => {
    renderSuccessPay();

    expect(
      screen.getByRole('button', { name: 'Volver a la tienda' })
    ).toBeTruthy();
  });

  it('debe navegar a productos al hacer clic en volver a la tienda', () => {
    renderSuccessPay();

    fireEvent.click(
      screen.getByRole('button', { name: 'Volver a la tienda' })
    );

    expect(screen.getByText('Ruta actual: /products')).toBeTruthy();
  });

  it('debe mostrar el contenido dentro del contenedor de la página', () => {
    const { container } = renderSuccessPay();

    expect(
      container.querySelector('.container.my-5.text-center')
    ).toBeTruthy();
  });
});
