import { Card } from 'react-bootstrap';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

function SuccessPayContent({ volverATienda }) {
  return (
    <Card className="p-5 shadow-sm border-success">
      <Text variant="h1" className="text-success mb-3">
        ¡Se ha realizado la compra con éxito!
      </Text>

      <Text variant="p" className="lead">
        Gracias por comprar en Shoes Shop. Tu pedido ya está siendo procesado.
      </Text>

      <div className="mt-4">
        <Button variant="primary" onClick={volverATienda}>
          Volver a la tienda
        </Button>
      </div>
    </Card>
  );
}

export default SuccessPayContent;