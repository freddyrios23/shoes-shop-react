import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>SHOES SHOP</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        Tienda de Calzado Online
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '30px' }}>
        <Button onClick={() => alert("probando botón")}>Comprar</Button>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button className="auth-btn" style={{ width: 'auto', padding: '8px 20px', marginTop: 0 }}>
            Iniciar Sesión
          </button>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button className="auth-btn" style={{ width: 'auto', padding: '8px 20px', marginTop: 0, backgroundColor: '#334155' }}>
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;