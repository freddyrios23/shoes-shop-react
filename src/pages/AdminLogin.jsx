import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/atoms/Input';
import Button from '../components/atoms/Button';

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
            <h2>Modo administrador</h2>

            <form onSubmit={ingresar}>
                <p>Usuario</p>
                <Input
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Ingrese usuario"
                />

                <p>Contraseña</p>
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