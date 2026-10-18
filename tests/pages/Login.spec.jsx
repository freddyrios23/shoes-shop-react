
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../../src/pages/Login';

function RutaActual() {
  const location = useLocation();
  return <p>Ruta actual: {location.pathname}</p>;
}

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
    spyOn(window, 'alert');
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  function renderLogin() {
    return render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RutaActual />} />
          <Route path="/register" element={<RutaActual />} />
          <Route path="/admin-login" element={<RutaActual />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('debe mostrar el título Iniciar sesión', () => {
    renderLogin();

    expect(
      screen.getByRole('heading', { name: 'Iniciar sesión' })
    ).toBeTruthy();
  });

  it('debe mostrar los campos de usuario y contraseña', () => {
    renderLogin();

    expect(screen.getByLabelText('Nombre de usuario')).toBeTruthy();
    expect(screen.getByLabelText('Contraseña')).toBeTruthy();
  });

  it('debe mostrar el botón para iniciar sesión', () => {
    renderLogin();

    expect(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    ).toBeTruthy();
  });

  it('debe mostrar una alerta si el usuario está vacío', () => {
    renderLogin();

    fireEvent.click(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    );

    expect(window.alert).toHaveBeenCalledWith(
      'Por favor ingresa tu nombre de usuario'
    );
  });

  it('debe mostrar una alerta si la contraseña está vacía', () => {
    renderLogin();

    fireEvent.change(screen.getByLabelText('Nombre de usuario'), {
      target: { value: 'freddy' }
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    );

    expect(window.alert).toHaveBeenCalledWith(
      'Por favor ingresa tu contraseña'
    );
  });

  it('debe mostrar un error si el usuario no está registrado', () => {
    localStorage.setItem('usuarios', JSON.stringify([]));

    renderLogin();

    fireEvent.change(screen.getByLabelText('Nombre de usuario'), {
      target: { value: 'desconocido' }
    });

    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '1234' }
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    );

    expect(screen.getByText('Usuario no encontrado')).toBeTruthy();
    expect(window.alert).toHaveBeenCalledWith('Usuario no encontrado');
  });

  it('debe mostrar un error si la contraseña es incorrecta', () => {
    localStorage.setItem(
      'usuarios',
      JSON.stringify([{ usuario: 'freddy', clave: '1234' }])
    );

    renderLogin();

    fireEvent.change(screen.getByLabelText('Nombre de usuario'), {
      target: { value: 'freddy' }
    });

    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '9999' }
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    );

    expect(screen.getByText('Contraseña incorrecta')).toBeTruthy();
    expect(window.alert).toHaveBeenCalledWith('Contraseña incorrecta');
  });

  it('debe iniciar sesión y navegar al inicio con credenciales correctas', () => {
    localStorage.setItem(
      'usuarios',
      JSON.stringify([{ usuario: 'freddy', clave: '1234' }])
    );

    renderLogin();

    fireEvent.change(screen.getByLabelText('Nombre de usuario'), {
      target: { value: 'freddy' }
    });

    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '1234' }
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    );

    expect(window.alert).toHaveBeenCalledWith(
      '¡Inicio de sesión exitoso!'
    );

    expect(screen.getByText('Ruta actual: /')).toBeTruthy();
  });
});
