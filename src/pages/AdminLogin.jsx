import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';


function AdminLogin() {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const navigate = useNavigate();

    function ingresar(e) {
        e.preventDefault();

        if (usuario === 'admin' && clave === '1234') {
            navigate('/Adminmode');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    }

    return (
        <div style={{
            border: '1px solid black',
            padding: '20px',
            width: '300px',
            margin: '170px auto'
        }}>
            <Text variant="h2">Modo administrador</Text>

            <form onSubmit={ingresar}>
                <Text>Usuario</Text>
                <Input
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Ingrese usuario"
                />

                <Text>Contraseña</Text>
                <Input
                    type="password"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    placeholder="Contraseña"
                />

                <br />
                <br />

                <Button type="submit">Ingresar</Button>
            </form>
        </div>
    );
}

export default AdminLogin;