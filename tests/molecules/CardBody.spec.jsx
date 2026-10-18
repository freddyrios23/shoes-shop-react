
import React from 'react';

// render permite mostrar el componente en una prueba.
// screen permite buscar los elementos que aparecen en pantalla.
import { render, screen } from '@testing-library/react';

// Importamos el componente que queremos probar.
import CardBody from '../../src/components/molecules/CardBody';

// describe agrupa todas las pruebas relacionadas con CardBody.
describe('Componente CardBody', () => {

  // Datos de ejemplo que utilizaremos en las pruebas.
  const productoPrueba = {
    title: 'Zapatillas deportivas',
    description: 'Zapatillas para correr',
    price: 29990
  };

  // PRUEBA 1: comprobar que se muestre el nombre.
  it('debe mostrar el nombre del producto', () => {

    // Renderizamos el componente entregándole sus propiedades.
    render(
      <CardBody
        title={productoPrueba.title}
        description={productoPrueba.description}
        price={productoPrueba.price}
      />
    );

    // Buscamos el nombre y verificamos que exista.
    expect(
      screen.getByText('Zapatillas deportivas')
    ).toBeTruthy();
  });

  // PRUEBA 2: comprobar que se muestre la descripción.
  it('debe mostrar la descripción del producto', () => {

    // Mostramos el componente con los datos de prueba.
    render(
      <CardBody
        title={productoPrueba.title}
        description={productoPrueba.description}
        price={productoPrueba.price}
      />
    );

    // Verificamos que la descripción esté en pantalla.
    expect(
      screen.getByText('Zapatillas para correr')
    ).toBeTruthy();
  });

  // PRUEBA 3: comprobar que se muestre el precio en formato chileno.
  it('debe mostrar el precio formateado', () => {

    // Renderizamos el componente con un precio de 29990.
    render(
      <CardBody
        title={productoPrueba.title}
        description={productoPrueba.description}
        price={productoPrueba.price}
      />
    );

    // El precio se muestra dentro de un elemento SPAN.
    // Buscamos ese elemento y comprobamos que contenga 29.990.
    const precio = screen.getByText((contenido, elemento) => {
      return elemento.tagName === 'SPAN' &&
        elemento.textContent.includes('29.990');
    });

    // Si encontramos el precio, la prueba pasa.
    expect(precio).toBeTruthy();
  });

  // PRUEBA 4: comprobar que el nombre tenga la etiqueta h5.
  it('debe mostrar el nombre dentro de un encabezado h5', () => {

    // Renderizamos el componente.
    render(
      <CardBody
        title={productoPrueba.title}
        description={productoPrueba.description}
        price={productoPrueba.price}
      />
    );

    // Buscamos el encabezado h5 que contiene el nombre.
    const titulo = screen.getByRole('heading', {
      level: 5,
      name: 'Zapatillas deportivas'
    });

    // Verificamos que el encabezado exista.
    expect(titulo).toBeTruthy();
  });

});
