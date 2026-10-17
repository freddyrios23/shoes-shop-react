import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckoutContent from '../components/organims/CheckoutContent';

function Checkout() {
  const navigate = useNavigate();

  // Leemos el carrito guardado
  const datosGuardados = localStorage.getItem('carrito');
  let cartItems = [];
  if (datosGuardados) {
    cartItems = JSON.parse(datosGuardados);
  }

  // Calculamos el total con ciclo for
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let cant = cartItems[i].cantidad;
    if (!cant) {
      cant = 1;
    }
    total = total + (cartItems[i].precio * cant);
  }

  // Estados simples para el formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [calle, setCalle] = useState('');
  const [comuna, setComuna] = useState('');

  // Función para procesar el pago
  const realizarPago = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !calle) {
      alert('Por favor completa los campos principales.');
      return;
    }

    // Validación sencilla de correo sin cosas raras
    if (correo.includes('..') || !correo.includes('@') || !correo.includes('.')) {
      alert('Por favor ingresa un correo válido (no se permiten puntos seguidos .. ni formatos incorrectos).');
      return;
    }

    // Vaciamos el carrito tras pagar
    localStorage.removeItem('carrito');

    // Redirigimos a la página de éxito
    navigate('/pago-exitoso');
  };

  return (
    <Container className="my-5">
      <CheckoutContent
        nombre={nombre}
        setNombre={setNombre}
        apellido={apellido}
        setApellido={setApellido}
        correo={correo}
        setCorreo={setCorreo}
        calle={calle}
        setCalle={setCalle}
        comuna={comuna}
        setComuna={setComuna}
        total={total}
        realizarPago={realizarPago}
      />
    </Container>
  );
}

export default Checkout;