import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Checkout from '../../src/pages/Checkout';

describe('Checkout', () => {

    beforeEach(() => {
        localStorage.removeItem('carrito');
        spyOn(window, 'alert');
    });

    function renderizarCheckout(productos = []) {
        localStorage.setItem('carrito', JSON.stringify(productos));

        return render(
            <MemoryRouter initialEntries={['/checkout']}>
                <Routes>
                    <Route
                        path="/checkout"
                        element={<Checkout />}
                    />
                    <Route
                        path="/pago-exitoso"
                        element={<h1>Pago exitoso</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    }

    function completarDatos() {
        fireEvent.change(
            screen.getByPlaceholderText('Ingresa tu nombre'),
            { target: { value: 'Freddy' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('ejemplo@correo.com'),
            { target: { value: 'freddy@gmail.com' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('Ej: Av. Las Condes 1234'),
            { target: { value: 'Av. Principal 123' } }
        );
    }

    function enviarFormulario() {
        const campo = screen.getByPlaceholderText('Ingresa tu nombre');
        const formulario = campo.closest('form');

        if (!formulario) {
            throw new Error('No se encontró el formulario de checkout');
        }

        fireEvent.submit(formulario);
    }

    it('debe mostrar el formulario de checkout', () => {
        renderizarCheckout();

        expect(
            screen.getByPlaceholderText('Ingresa tu nombre')
        ).toBeTruthy();

        expect(
            screen.getByPlaceholderText('ejemplo@correo.com')
        ).toBeTruthy();

        expect(
            screen.getByPlaceholderText('Ej: Av. Las Condes 1234')
        ).toBeTruthy();
    });

    it('debe calcular el total del carrito', () => {
        renderizarCheckout([
            {
                id: 1,
                nombre: 'Zapatillas',
                precio: 50000,
                cantidad: 2
            }
        ]);

        expect(
            screen.getByRole('heading', {
                name: /total a pagar.*100000/i
            })
        ).toBeTruthy();
    });

    it('debe mostrar una alerta si faltan campos principales', () => {
        renderizarCheckout();

        enviarFormulario();

        expect(window.alert).toHaveBeenCalledWith(
            'Por favor completa los campos principales.'
        );
    });

    it('debe rechazar un correo inválido', () => {
        renderizarCheckout();
        completarDatos();

        fireEvent.change(
            screen.getByPlaceholderText('ejemplo@correo.com'),
            { target: { value: 'freddycorreo' } }
        );

        enviarFormulario();

        expect(window.alert).toHaveBeenCalledWith(
            jasmine.stringMatching(/correo válido/i)
        );
    });

    it('debe rechazar un correo con puntos seguidos', () => {
        renderizarCheckout();
        completarDatos();

        fireEvent.change(
            screen.getByPlaceholderText('ejemplo@correo.com'),
            { target: { value: 'freddy..rios@gmail.com' } }
        );

        enviarFormulario();

        expect(window.alert).toHaveBeenCalledWith(
            jasmine.stringMatching(/correo válido/i)
        );
    });

    it('debe redirigir a la página de pago exitoso', () => {
        renderizarCheckout([
            {
                id: 1,
                nombre: 'Zapatillas',
                precio: 50000,
                cantidad: 1
            }
        ]);

        completarDatos();
        enviarFormulario();

        expect(
            screen.getByRole('heading', { name: 'Pago exitoso' })
        ).toBeTruthy();
    });

    it('debe eliminar el carrito después de pagar', () => {
        renderizarCheckout([
            {
                id: 1,
                nombre: 'Zapatillas',
                precio: 50000,
                cantidad: 1
            }
        ]);

        completarDatos();
        enviarFormulario();

        expect(localStorage.getItem('carrito')).toBeNull();
    });

    it('debe impedir el pago si falta el correo', () => {
        renderizarCheckout();

        fireEvent.change(
            screen.getByPlaceholderText('Ingresa tu nombre'),
            { target: { value: 'Freddy' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('Ej: Av. Las Condes 1234'),
            { target: { value: 'Av. Principal 123' } }
        );

        enviarFormulario();

        expect(window.alert).toHaveBeenCalledWith(
            'Por favor completa los campos principales.'
        );
    });

});
