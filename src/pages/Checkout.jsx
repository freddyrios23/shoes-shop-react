import { useState } from 'react';
import { Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';

function Checkout() {
  const navigate = useNavigate();

  // Leemos el carrito guardado
  const datosGuardados = localStorage.getItem('carrito');
  let cartItems = [];
  if (datosGuardados) {
    cartItems = JSON.parse(datosGuardados);
  }

  // Calculamos el total
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

  // Función al hacer clic en Pagar ahora
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
      <Card className="p-4 shadow-sm">
        <h2>Información del Cliente y Dirección</h2>
        <p className="text-muted">Completa los datos para realizar la entrega de tus productos.</p>

        <Form onSubmit={realizarPago}>
          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ingresa tu apellido"
              />
            </div>
          </div>

          <div className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-8 mb-3">
              <Form.Label>Calle y Número</Form.Label>
              <Form.Control
                type="text"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                placeholder="Ej: Av. Las Condes 1234"
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <Form.Label>Comuna</Form.Label>
              <Form.Control
                type="text"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                placeholder="Ej: Santiago"
              />
            </div>
          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-between align-items-center">
            <h3>Total a Pagar: ${total}</h3>
            <Button variant="success" type="submit">
              Pagar ahora ${total}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default Checkout;