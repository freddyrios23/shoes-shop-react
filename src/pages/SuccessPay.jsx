import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SuccessPayContent from '../components/organims/SuccessPayContent';

function SuccessPay() {
  const navigate = useNavigate();

  const volverATienda = () => {
    navigate('/products');
  };

  return (
    <Container className="my-5 text-center">
      <SuccessPayContent volverATienda={volverATienda} />
    </Container>
  );
}

export default SuccessPay;