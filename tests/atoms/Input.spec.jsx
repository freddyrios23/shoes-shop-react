
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from '../../src/components/atoms/Input';

describe('Componente Input', () => {

  // Verifica que el input se muestre correctamente.
  it('debe mostrar un campo de texto', () => {
    render(<Input aria-label="Nombre" />);

    const campo = screen.getByLabelText('Nombre');

    expect(campo).toBeTruthy();
    expect(campo.type).toBe('text');
  });

  // Verifica que permita cambiar el tipo de campo.
  it('debe permitir utilizar un campo de tipo email', () => {
    render(<Input type="email" aria-label="Correo" />);

    const campo = screen.getByLabelText('Correo');

    expect(campo.type).toBe('email');
  });

  // Verifica que permita crear un área de texto.
  it('debe mostrar un textarea cuando se indica ese tipo', () => {
    render(<Input type="textarea" aria-label="Mensaje" />);

    const campo = screen.getByLabelText('Mensaje');

    expect(campo.tagName).toBe('TEXTAREA');
  });

  // Verifica que aplique la clase CSS recibida.
  it('debe aplicar la clase CSS recibida', () => {
    render(
      <Input
        className="campo-personalizado"
        aria-label="Usuario"
      />
    );

    const campo = screen.getByLabelText('Usuario');

    expect(campo.classList.contains('campo-personalizado')).toBe(true);
  });

});
