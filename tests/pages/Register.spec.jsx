
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import Register from '../../src/pages/Register';

function RutaActual() {
  const location = useLocation();
  return <p>Ruta actual: {location.pathname}</p>;
}

describe('Register', () => {
  beforeEach(() => {
    localStorage.clear();
    spyOn(window, 'alert');
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  function renderRegister() {
    return render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<RutaActual />} />
        </Routes>
      </MemoryRouter>
    );
  }

  function completarFormulario({
    usuario = 'freddy',
    rut = '12.345.678-9',
    correo = 'freddy@correo.com',
    clave = '1234',
    confirmar = '1234'
  } = {}) {
    fireEvent.change(screen.getByLabelText('Nombre de usuario'), {
      target: { value: usuario }
    });
    fireEvent.change(screen.getByLabelText('RUT'), {
      target: { value: rut }
    });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: correo }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: clave }
    });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: confirmar }
    });
  }

  it('debe mostrar el título Registrarse', () => {
    renderRegister();

    expect(
      screen.getByRole('heading', { name: 'Registrarse' })
    ).toBeTruthy();
  });

  it('debe mostrar los cinco campos del formulario', () => {
    renderRegister();

    expect(screen.getByLabelText('Nombre de usuario')).toBeTruthy();
    expect(screen.getByLabelText('RUT')).toBeTruthy();
    expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
    expect(screen.getByLabelText('Contraseña')).toBeTruthy();
    expect(screen.getByLabelText('Confirmar contraseña')).toBeTruthy();
  });

  it('debe mostrar el botón para registrarse', () => {
    renderRegister();

    expect(
      screen.getByRole('button', { name: 'Registrarse' })
    ).toBeTruthy();
  });

  it('debe mostrar el enlace para iniciar sesión', () => {
    renderRegister();

    expect(
      screen.getByRole('link', { name: 'Inicia sesión' }).getAttribute('href')
    ).toBe('/login');
  });

  it('debe mostrar una alerta si faltan campos', () => {
    renderRegister();

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    expect(window.alert).toHaveBeenCalledWith(
      'Debes completar todos los campos'
    );
  });

  it('debe mostrar una alerta si las contraseñas no coinciden', () => {
    renderRegister();
    completarFormulario({ clave: '1234', confirmar: '5678' });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    expect(window.alert).toHaveBeenCalledWith(
      'Las contraseñas no coinciden'
    );
  });

  it('debe impedir registrar un nombre de usuario existente', () => {
    localStorage.setItem(
      'usuarios',
      JSON.stringify([{ usuario: 'freddy', clave: '1234' }])
    );

    renderRegister();
    completarFormulario();

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    expect(window.alert).toHaveBeenCalledWith(
      'Este nombre de usuario ya está registrado'
    );
  });

  it('debe guardar el usuario correctamente en localStorage', () => {
    renderRegister();
    completarFormulario();

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    const usuarios = JSON.parse(localStorage.getItem('usuarios'));

    expect(usuarios.length).toBe(1);
    expect(usuarios[0].usuario).toBe('freddy');
    expect(usuarios[0].rut).toBe('12.345.678-9');
    expect(usuarios[0].correo).toBe('freddy@correo.com');
    expect(usuarios[0].clave).toBe('1234');
  });

  it('debe mostrar un mensaje de registro exitoso', () => {
    renderRegister();
    completarFormulario();

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    expect(window.alert).toHaveBeenCalledWith('¡Registro exitoso!');
  });

  it('debe navegar al inicio de sesión después de registrarse', () => {
    renderRegister();
    completarFormulario();

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    expect(screen.getByText('Ruta actual: /login')).toBeTruthy();
  });
});
