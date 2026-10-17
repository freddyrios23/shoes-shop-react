import { Form } from 'react-bootstrap';
import Button from '../atoms/Button';

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
  );
}

export default CheckoutForm;