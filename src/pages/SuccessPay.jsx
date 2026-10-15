import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';

function SuccessPay() {
  const navigate = useNavigate();

  return (
    <Container className="my-5 text-center">
      <Card className="p-5 shadow-sm border-success">
        <h1 className="text-success mb-3">¡Se ha realizado la compra con éxito!</h1>
        <p className="lead">Gracias por comprar en Shoes Shop. Tu pedido ya está siendo procesado.</p>
        <div className="mt-4">
          <Button variant="primary" onClick={() => navigate('/products')}>
            Volver a la tienda
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default SuccessPay;