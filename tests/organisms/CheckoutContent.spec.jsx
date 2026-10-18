
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CheckoutContent from '../../src/components/organims/CheckoutContent';

// Simulamos las propiedades que recibe CheckoutForm.
const propsIniciales = {
    nombre: '',
    setNombre: jasmine.createSpy('setNombre'),
    apellido: '',
    setApellido: jasmine.createSpy('setApellido'),
    correo: '',
    setCorreo: jasmine.createSpy('setCorreo'),
    calle: '',
    setCalle: jasmine.createSpy('setCalle'),
    comuna: '',
    setComuna: jasmine.createSpy('setComuna'),
    total: '29.990',
    realizarPago: jasmine.createSpy('realizarPago')
};

describe('CheckoutContent', () => {

    // Prueba 1: comprobar que se muestra el título.
    it('debe mostrar el título de información del cliente', () => {
        render(
            <MemoryRouter>
                <CheckoutContent {...propsIniciales} />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Información del Cliente y Dirección')
        ).toBeTruthy();
    });

    // Prueba 2: comprobar que se muestra la descripción.
    it('debe mostrar la descripción del formulario', () => {
        render(
            <MemoryRouter>
                <CheckoutContent {...propsIniciales} />
            </MemoryRouter>
        );

        expect(
            screen.getByText(
                'Completa los datos para realizar la entrega de tus productos.'
            )
        ).toBeTruthy();
    });

    // Prueba 3: comprobar que aparece el formulario de checkout.
    it('debe mostrar los campos del formulario', () => {
        render(
            <MemoryRouter>
                <CheckoutContent {...propsIniciales} />
            </MemoryRouter>
        );

        expect(screen.getByText('Nombre')).toBeTruthy();
        expect(screen.getByText('Apellido')).toBeTruthy();
        expect(screen.getByText('Correo Electrónico')).toBeTruthy();
    });

    // Prueba 4: comprobar que se muestra el total a pagar.
    it('debe mostrar el total de la compra', () => {
        render(
            <MemoryRouter>
                <CheckoutContent {...propsIniciales} />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Total a Pagar: $29.990')
        ).toBeTruthy();
    });

});

