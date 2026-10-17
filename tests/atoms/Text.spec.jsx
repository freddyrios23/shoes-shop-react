
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Text from '../../src/components/atoms/Text.jsx';

// Configuramos el entorno de pruebas de React.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;


// describe agrupa las pruebas relacionadas con el componente Text.
describe('Componente Text', () => {

  // Declaramos variables para guardar el contenedor HTML y la raíz de React.
  let container;
  let root;

  // beforeEach se ejecuta antes de cada prueba.
  beforeEach(() => {

    // Creamos un elemento div que servirá para mostrar el componente.
    container = document.createElement('div');

    // Agregamos el div al documento HTML.
    document.body.appendChild(container);

    // Creamos la raíz de React dentro del contenedor.
    root = createRoot(container);
  });

  // afterEach se ejecuta después de cada prueba.
  afterEach(() => {

    // Desmontamos el componente para limpiar React correctamente.
    act(() => {
      root.unmount();
    });

    // Eliminamos el contenedor del documento.
    container.remove();
  });

  // Primera prueba: verifica que Text muestre el contenido recibido.
  it('debe mostrar el texto recibido', () => {

    // Renderizamos el componente con el texto "Hola Shoes Shop".
    act(() => {
      root.render(<Text>Hola Shoes Shop</Text>);
    });

    // Comprobamos que el contenido mostrado sea exactamente el esperado.
    expect(container.textContent).toBe('Hola Shoes Shop');
  });

  // Segunda prueba: verifica que Text permita elegir una etiqueta HTML.
  it('debe utilizar la etiqueta h1 cuando se indica esa variante', () => {

    // Renderizamos Text indicando que debe utilizar una etiqueta h1.
    act(() => {
      root.render(
        <Text variant="h1">Productos</Text>
      );
    });

    // Comprobamos que exista una etiqueta h1 en el contenedor.
    expect(container.querySelector('h1')).not.toBeNull();

    // Comprobamos que la etiqueta h1 contenga el texto esperado.
    expect(container.querySelector('h1').textContent).toBe('Productos');
  });
});
