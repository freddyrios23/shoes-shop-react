import { Card } from 'react-bootstrap';
import CheckoutForm from '../molecules/CheckoutForm';

function CheckoutContent(props) {
  return (
    <Card className="p-4 shadow-sm">
      <h2>Información del Cliente y Dirección</h2>
      <p className="text-muted">Completa los datos para realizar la entrega de tus productos.</p>
      <CheckoutForm {...props} />
    </Card>
  );
}

export default CheckoutContent;