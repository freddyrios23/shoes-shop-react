
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../src/components/molecules/SearchBar';

describe('Componente SearchBar', () => {

  // Verifica que se muestre el campo de búsqueda.
  it('debe mostrar el campo para buscar productos', () => {
    render(<SearchBar />);

    const campo = screen.getByPlaceholderText('Buscar productos...');

    expect(campo).toBeTruthy();
  });

  // Verifica que el usuario pueda escribir en el buscador.
  it('debe permitir escribir un producto', () => {
    render(<SearchBar />);

    const campo = screen.getByPlaceholderText('Buscar productos...');

    fireEvent.change(campo, { target: { value: 'Zapatillas' } });

    expect(campo.value).toBe('Zapatillas');
  });

  // Verifica que el botón envíe el texto escrito a onSearch.
  it('debe buscar al presionar el botón', () => {
    const onSearch = jasmine.createSpy('onSearch');

    render(<SearchBar onSearch={onSearch} />);

    const campo = screen.getByPlaceholderText('Buscar productos...');
    fireEvent.change(campo, { target: { value: 'Zapatillas' } });

    fireEvent.click(screen.getByText('Buscar'));

    expect(onSearch).toHaveBeenCalledWith('Zapatillas');
  });

  // Verifica que Enter ejecute la búsqueda.
  it('debe buscar al presionar Enter', () => {
    const onSearch = jasmine.createSpy('onSearch');

    render(<SearchBar onSearch={onSearch} />);

    const campo = screen.getByPlaceholderText('Buscar productos...');
    fireEvent.change(campo, { target: { value: 'Zapatos' } });

    fireEvent.keyDown(campo, { key: 'Enter' });

    expect(onSearch).toHaveBeenCalledWith('Zapatos');
  });

});
