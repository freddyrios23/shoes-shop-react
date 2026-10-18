import { useState, useEffect } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Image from '../components/atoms/Image';

function Cart() {
  const navigate = useNavigate();

  // Bloquea el acceso al carrito si no se inició sesión
  useEffect(() => {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    if (!usuarioActivo) {
      alert('Debes iniciar sesión para ver y acceder al carrito de compras.');
      navigate('/login');
    }
  }, [navigate]);

  const datosGuardados = localStorage.getItem('carrito');

  let listaInicial = [];
  if (datosGuardados) {
    listaInicial = JSON.parse(datosGuardados);
  }

  const [cartItems, setCartItems] = useState(listaInicial);

  const sumarCantidad = (posicion) => {
    const copia = [...cartItems];
    if (!copia[posicion].cantidad) {
      copia[posicion].cantidad = 1;
    }
    copia[posicion].cantidad = copia[posicion].cantidad + 1;

    setCartItems(copia);
    localStorage.setItem('carrito', JSON.stringify(copia));
  };

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

  const eliminarProducto = (posicionABorrar) => {
    const nuevaLista = cartItems.filter((item, index) => index !== posicionABorrar);
    setCartItems(nuevaLista);
    localStorage.setItem('carrito', JSON.stringify(nuevaLista));
  };

  const vaciarCarrito = () => {
    setCartItems([]);
    localStorage.removeItem('carrito');
  };

  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let cant = cartItems[i].cantidad;
    if (!cant) {
      cant = 1;
    }
    total = total + (cartItems[i].precio * cant);
  }

  const irAPagar = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h1>Carrito de Compras</h1>
        <p>El carrito está vacío por ahora.</p>
      </Container>
    );
  }

  return (
    <Container className="my-4 cart-container">
      <Alert variant="info">
        <strong>¡Carrito de compras pagina shoes shop!</strong>
      </Alert>

      <h1 className="mb-4">Carrito de Compras</h1>

      <Table striped bordered hover responsive="md" className="cart-table">
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
                <td className="cart-image-cell">
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    className="cart-product-image"
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain'
                    }}
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
          <Button variant="success" onClick={irAPagar}>
            Comprar ahora
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;