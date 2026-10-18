import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckoutContent from '../components/organims/CheckoutContent';

function Checkout() {
  const navigate = useNavigate();

  const datosGuardados = localStorage.getItem('carrito');
  let cartItems = [];
  if (datosGuardados) {
    cartItems = JSON.parse(datosGuardados);
  }

  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let cant = cartItems[i].cantidad;
    if (!cant) {
      cant = 1;
    }
    total = total + (cartItems[i].precio * cant);
  }

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [calle, setCalle] = useState('');
  const [comuna, setComuna] = useState('');

  // Expresión regular que admite únicamente letras y espacios (sin números ni símbolos)
  const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  const realizarPago = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !calle) {
      alert('Por favor completa los campos principales.');
      return;
    }

    // Validación para el nombre
    if (!soloLetrasRegex.test(nombre)) {
      alert('El nombre solo debe contener letras. No se permiten números, puntos ni símbolos.');
      return;
    }

    // Validación para el apellido si no está vacío
    if (apellido && !soloLetrasRegex.test(apellido)) {
      alert('El apellido solo debe contener letras. No se permiten números, puntos ni símbolos.');
      return;
    }

    // Validación simple del correo
    if (correo.includes('..') || !correo.includes('@') || !correo.includes('.')) {
      alert('Por favor ingresa un correo válido (no se permiten puntos seguidos .. ni formatos incorrectos).');
      return;
    }

    localStorage.removeItem('carrito');
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