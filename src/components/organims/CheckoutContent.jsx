
import { Card } from 'react-bootstrap';
import Text from '../atoms/Text';
import CheckoutForm from '../molecules/CheckoutForm';

function CheckoutContent(props) {
  return (
    <Card className="p-4 shadow-sm">

      {/* Título del formulario */}
      <Text variant="h2">
        Información del Cliente y Dirección
      </Text>

      {/* Descripción del formulario */}
      <Text variant="p" className="text-muted">
        Completa los datos para realizar la entrega de tus productos.
      </Text>

      {/* Formulario de pago */}
      <CheckoutForm {...props} />

    </Card>
  );
}

export default CheckoutContent;
