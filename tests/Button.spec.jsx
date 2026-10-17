import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Importamos el componente Button que vamos a probar
import Button from '../../../components/atoms/Button';

describe('Prueba del Átomo Button', () => {

  //  verifica que el botón se renderice correctamente con el texto proporcionado
  it('renderiza el texto del botón', () => {
    render(<Button>Comprar</Button>);
    expect(screen.getByText('Comprar')).toBeTruthy();
  });

  // verifica que el botón tenga la clase de Bootstrap correspondiente a la variante
  it('aplica las clases/variantes de Bootstrap', () => {
    render(<Button variant="success">Pagar</Button>);
    const boton = screen.getByText('Pagar');
    expect(boton).toHaveClass('btn-success');
  });

  //Verifica que la interacción funcione con el clic
  it('ejecuta la función al hacer clic', () => {
    const funcionEspia = jasmine.createSpy('alHacerClic');
    render(<Button onClick={funcionEspia}>Pagar</Button>);

    const boton = screen.getByText('Pagar');
    fireEvent.click(boton);

    expect(funcionEspia).toHaveBeenCalled();
  });

});