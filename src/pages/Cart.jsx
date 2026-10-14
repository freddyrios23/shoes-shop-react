import { useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import Button from '../components/atoms/Button';
import Image from '../components/atoms/Image';

function Cart() {
  // se lee lo que esta guardado en el navegador
  const datosGuardados = localStorage.getItem('carrito');

  let listaInicial = [];
  if (datosGuardados) {
    listaInicial = JSON.parse(datosGuardados);
  }

  // se guarda la lista de estados
  const [cartItems, setCartItems] = useState(listaInicial);

  // Función para sumar 1 a la cantidad
  const sumarCantidad = (posicion) => {
    const copia = [...cartItems];
    if (!copia[posicion].cantidad) {
      copia[posicion].cantidad = 1;
    }
    copia[posicion].cantidad = copia[posicion].cantidad + 1;

    setCartItems(copia);
    localStorage.setItem('carrito', JSON.stringify(copia));
  };

  // Función para restar 1 a la cantidad
  const restarCantidad = (posicion) => {
    const copia = [...cartItems];
    let cantidadActual = copia[posicion].cantidad;
    if (!cantidadActual) {
      cantidadActual = 1;
    }

    if (cantidadActual > 1) {
      copia[posicion].cantidad = cantidadActual - 1;
      setCartItems(copia);
      localStorage.setItem('carrito', JSON.stringify(copia));
    }
  };

  // funcion para borrar un producto
  const eliminarProducto = (posicionABorrar) => {
    const nuevaLista = cartItems.filter((item, index) => index !== posicionABorrar);
    setCartItems(nuevaLista);
    localStorage.setItem('carrito', JSON.stringify(nuevaLista));
  };

  // funcion para borrar el carrito
  const vaciarCarrito = () => {
    setCartItems([]);
    localStorage.removeItem('carrito');
  };

  // calcula el total de un ciclo
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let cant = cartItems[i].cantidad;
    if (!cant) {
      cant = 1;
    }
    total = total + (cartItems[i].precio * cant);
  }

  // si el carrito esta vacío
  if (cartItems.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h1>Carrito de Compras</h1>
        <p>El carrito está vacío por ahora.</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Alert variant="info">
        <strong>¡carrito de compras pagina shoes shop!</strong>
      </Alert>

      <h1 className="mb-4">Carrito de Compras</h1>

      <Table striped bordered hover align="middle">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => {
            let cantidad = item.cantidad;
            if (!cantidad) {
              cantidad = 1;
            }
            const subtotal = item.precio * cantidad;

            return (
              <tr key={index}>
                <td style={{ width: '70px' }}>
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td>{item.nombre}</td>
                <td>${item.precio}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={() => restarCantidad(index)}>
                      -
                    </Button>
                    <span>{cantidad}</span>
                    <Button variant="secondary" size="sm" onClick={() => sumarCantidad(index)}>
                      +
                    </Button>
                  </div>
                </td>
                <td>${subtotal}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => eliminarProducto(index)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="text-end mt-4">
        <h3>Total: ${total}</h3>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="secondary" onClick={vaciarCarrito}>
            Vaciar
          </Button>
          <Button variant="success" onClick={() => alert('Pasando a la pantalla de pago...')}>
            Comprar ahora
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;