
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SuccessPayContent from '../../src/components/organims/SuccessPayContent';

describe('SuccessPayContent', () => {

    // Prueba 1: comprobar que se muestra el mensaje de compra exitosa.
    it('debe mostrar el mensaje de compra exitosa', () => {
        render(<SuccessPayContent volverATienda={() => {}} />);

        expect(
            screen.getByText('¡Se ha realizado la compra con éxito!')
        ).toBeTruthy();
    });

    // Prueba 2: comprobar que se muestra el mensaje de agradecimiento.
    it('debe mostrar el mensaje de agradecimiento', () => {
        render(<SuccessPayContent volverATienda={() => {}} />);

        expect(
            screen.getByText(
                'Gracias por comprar en Shoes Shop. Tu pedido ya está siendo procesado.'
            )
        ).toBeTruthy();
    });

    // Prueba 3: comprobar que aparece el botón para volver a la tienda.
    it('debe mostrar el botón Volver a la tienda', () => {
        render(<SuccessPayContent volverATienda={() => {}} />);

        expect(
            screen.getByRole('button', { name: 'Volver a la tienda' })
        ).toBeTruthy();
    });

    // Prueba 4: comprobar que se ejecuta la función al pulsar el botón.
    it('debe ejecutar volverATienda al hacer clic en el botón', () => {
        const volverATienda = jasmine.createSpy('volverATienda');

        render(<SuccessPayContent volverATienda={volverATienda} />);

        fireEvent.click(
            screen.getByRole('button', { name: 'Volver a la tienda' })
        );

        expect(volverATienda).toHaveBeenCalled();
    });

});
