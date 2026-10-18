
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutForm from '../../src/components/molecules/CheckoutForm';

// Simula las funciones y los datos que recibe el formulario.
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

describe('CheckoutForm', () => {

    // Prueba 1: comprobar que se muestran los campos del formulario.
    it('debe mostrar los campos de datos del cliente', () => {
        render(<CheckoutForm {...propsIniciales} />);

        expect(screen.getByText('Nombre')).toBeTruthy();
        expect(screen.getByText('Apellido')).toBeTruthy();
        expect(screen.getByText('Correo Electrónico')).toBeTruthy();
        expect(screen.getByText('Calle y Número')).toBeTruthy();
        expect(screen.getByText('Comuna')).toBeTruthy();
    });

    // Prueba 2: comprobar que se muestra el total a pagar.
    it('debe mostrar el total de la compra', () => {
        render(<CheckoutForm {...propsIniciales} />);

        expect(screen.getByText('Total a Pagar: $29.990')).toBeTruthy();
    });

    // Prueba 3: comprobar que el nombre actualiza su estado.
    it('debe llamar a setNombre cuando se escribe el nombre', () => {
        render(<CheckoutForm {...propsIniciales} />);

        const campoNombre = screen.getByPlaceholderText('Ingresa tu nombre');

        fireEvent.change(campoNombre, {
            target: { value: 'Freddy' }
        });

        expect(propsIniciales.setNombre).toHaveBeenCalledWith('Freddy');
    });

    // Prueba 4: comprobar que el correo actualiza su estado.
    it('debe llamar a setCorreo cuando se escribe el correo', () => {
        render(<CheckoutForm {...propsIniciales} />);

        const campoCorreo = screen.getByPlaceholderText('ejemplo@correo.com');

        fireEvent.change(campoCorreo, {
            target: { value: 'prueba@correo.com' }
        });

        expect(propsIniciales.setCorreo).toHaveBeenCalledWith('prueba@correo.com');
    });

    // Prueba 5: comprobar que existe el botón para pagar.
    it('debe mostrar el botón para realizar el pago', () => {
        render(<CheckoutForm {...propsIniciales} />);

        expect(screen.getByRole('button', {
            name: 'Pagar ahora $29.990'
        })).toBeTruthy();
    });
});
