
import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../src/components/atoms/Image';

describe('Componente Image', () => {

  // Verifica que se muestre la imagen.
  it('debe mostrar una imagen', () => {
    render(<Image src="/zapato.png" alt="Zapato deportivo" />);

    const imagen = screen.getByAltText('Zapato deportivo');

    expect(imagen).toBeTruthy();
  });

  // Verifica que utilice la ruta de imagen recibida.
  it('debe utilizar la ruta de imagen recibida', () => {
    render(<Image src="/zapato.png" alt="Zapato" />);

    const imagen = screen.getByAltText('Zapato');

    expect(imagen.getAttribute('src')).toBe('/zapato.png');
  });

  // Verifica que aplique la clase CSS recibida.
  it('debe aplicar la clase CSS recibida', () => {
    render(
      <Image
        src="/zapato.png"
        alt="Zapato"
        className="imagen-producto"
      />
    );

    const imagen = screen.getByAltText('Zapato');

    expect(imagen.classList.contains('imagen-producto')).toBe(true);
  });

});
