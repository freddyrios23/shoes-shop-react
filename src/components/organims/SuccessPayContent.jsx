import { Card } from 'react-bootstrap';
import Button from '../atoms/Button';

function SuccessPayContent({ volverATienda }) {
  return (
    <Card className="p-5 shadow-sm border-success">
      <h1 className="text-success mb-3">¡Se ha realizado la compra con éxito!</h1>
      <p className="lead">Gracias por comprar en Shoes Shop. Tu pedido ya está siendo procesado.</p>
      <div className="mt-4">
        <Button variant="primary" onClick={volverATienda}>
          Volver a la tienda
        </Button>
      </div>
    </Card>
  );
}

export default SuccessPayContent;