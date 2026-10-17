import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from '../../src/pages/AdminLogin';

function RutaActual() {
    const location = useLocation();

    return <p>Ruta actual: {location.pathname}</p>;
}

describe('AdminLogin', () => {
    beforeEach(() => {
        spyOn(window, 'alert');
    });

    function renderAdminLogin() {
        return render(
            <MemoryRouter initialEntries={['/adminlogin']}>
                <Routes>
                    <Route path="/adminlogin" element={<AdminLogin />} />
                    <Route
                        path="/Adminmode"
                        element={<RutaActual />}
                    />
                </Routes>
            </MemoryRouter>
        );
    }

    it('debe mostrar el título del modo administrador', () => {
        renderAdminLogin();

        expect(
            screen.getByRole('heading', {
                name: 'Modo administrador'
            })
        ).toBeTruthy();
    });

    it('debe mostrar los campos de usuario y contraseña', () => {
        renderAdminLogin();

        expect(
            screen.getByPlaceholderText('Ingrese usuario')
        ).toBeTruthy();

        expect(
            screen.getByPlaceholderText('Contraseña')
        ).toBeTruthy();
    });

    it('debe mostrar el botón para ingresar', () => {
        renderAdminLogin();

        expect(
            screen.getByRole('button', { name: /ingresar/i })
        ).toBeTruthy();
    });

    it('debe navegar al panel con las credenciales correctas', () => {
        renderAdminLogin();

        fireEvent.change(
            screen.getByPlaceholderText('Ingrese usuario'),
            { target: { value: 'admin' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('Contraseña'),
            { target: { value: '1234' } }
        );

        fireEvent.click(
            screen.getByRole('button', { name: /ingresar/i })
        );

        expect(
            screen.getByText('Ruta actual: /Adminmode')
        ).toBeTruthy();
    });

    it('debe mostrar una alerta con credenciales incorrectas', () => {
        renderAdminLogin();

        fireEvent.change(
            screen.getByPlaceholderText('Ingrese usuario'),
            { target: { value: 'usuarioincorrecto' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('Contraseña'),
            { target: { value: '9999' } }
        );

        fireEvent.click(
            screen.getByRole('button', { name: /ingresar/i })
        );

        expect(window.alert).toHaveBeenCalledWith(
            'Usuario o contraseña incorrectos'
        );
    });
});