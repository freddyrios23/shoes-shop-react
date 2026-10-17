import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../../src/pages/Contact';

describe('Contact', () => {

    beforeEach(() => {
        spyOn(window, 'alert');
    });

    it('debe mostrar el título de contacto', () => {
        render(<Contact />);

        expect(
            screen.getByRole('heading', { name: 'Contacto' })
        ).toBeTruthy();
    });

    it('debe mostrar los campos del formulario', () => {
        render(<Contact />);

        expect(
            screen.getByPlaceholderText('Escribe tu nombre')
        ).toBeTruthy();

        expect(
            screen.getByPlaceholderText('ejemplo@correo.com')
        ).toBeTruthy();

        expect(
            screen.getByPlaceholderText('¿Sobre qué trata tu consulta?')
        ).toBeTruthy();

        expect(
            screen.getByPlaceholderText('Escribe tu mensaje aquí...')
        ).toBeTruthy();
    });

    it('debe mostrar una alerta si los campos están vacíos', () => {
        render(<Contact />);

        fireEvent.click(
            screen.getByRole('button', { name: /^enviar$/i })
        );

        expect(window.alert).toHaveBeenCalledWith(
            'Por favor, completa todos los campos.'
        );
    });

    it('debe rechazar un correo inválido', () => {
        render(<Contact />);

        fireEvent.change(
            screen.getByPlaceholderText('Escribe tu nombre'),
            { target: { value: 'Freddy' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('ejemplo@correo.com'),
            { target: { value: 'correo-invalido' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('¿Sobre qué trata tu consulta?'),
            { target: { value: 'Consulta' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('Escribe tu mensaje aquí...'),
            { target: { value: 'Quiero consultar por unas zapatillas.' } }
        );

        fireEvent.click(
            screen.getByRole('button', { name: /^enviar$/i })
        );

        expect(window.alert).toHaveBeenCalledWith(
            'Ingresa un correo electrónico válido.'
        );
    });

    it('debe mostrar una confirmación al enviar datos válidos', () => {
        render(<Contact />);

        fireEvent.change(
            screen.getByPlaceholderText('Escribe tu nombre'),
            { target: { value: 'Freddy' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('ejemplo@correo.com'),
            { target: { value: 'freddy@gmail.com' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('¿Sobre qué trata tu consulta?'),
            { target: { value: 'Consulta sobre productos' } }
        );

        fireEvent.change(
            screen.getByPlaceholderText('Escribe tu mensaje aquí...'),
            { target: { value: 'Quiero conocer las tallas disponibles.' } }
        );

        fireEvent.click(
            screen.getByRole('button', { name: /^enviar$/i })
        );

        expect(
            screen.getByText(
                '¡Gracias por contactarnos! Tu mensaje fue enviado.'
            )
        ).toBeTruthy();
    });

});
