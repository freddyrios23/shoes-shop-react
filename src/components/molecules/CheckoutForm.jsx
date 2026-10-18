import React from 'react';
import { Form } from 'react-bootstrap';
import { Input } from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

function CheckoutForm({
  nombre,
  setNombre,
  apellido,
  setApellido,
  correo,
  setCorreo,
  calle,
  setCalle,
  comuna,
  setComuna,
  total,
  realizarPago
}) {
  return (
    <Form onSubmit={realizarPago}>
      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <Form.Label>
            <Text variant="span">Nombre</Text>
          </Form.Label>
          <Input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <Form.Label>
            <Text variant="span">Apellido</Text>
          </Form.Label>
          <Input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Ingresa tu apellido"
          />
        </div>
      </div>

      <div className="mb-3">
        <Form.Label>
          <Text variant="span">Correo Electrónico</Text>
        </Form.Label>
        <Input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="ejemplo@correo.com"
          required
        />
      </div>

      <div className="row">
        <div className="col-md-8 mb-3">
          <Form.Label>
            <Text variant="span">Calle y Número</Text>
          </Form.Label>
          <Input
            type="text"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
            placeholder="Ej: Av. Las Condes 1234"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <Form.Label>
            <Text variant="span">Comuna</Text>
          </Form.Label>
          <Input
            type="text"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            placeholder="Ej: Santiago"
          />
        </div>
      </div>

      <hr className="my-4" />

      <div className="d-flex justify-content-between align-items-center">
        <Text variant="h3">Total a Pagar: ${total}</Text>
        <Button variant="success" type="submit">
          Pagar ahora ${total}
        </Button>
      </div>
    </Form>
  );
}

export default CheckoutForm;