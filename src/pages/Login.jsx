import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const navigate = useNavigate();

  function iniciarSesion(e) {
    e.preventDefault();

    if (usuario === '') {
      alert('Por favor ingresa tu nombre de usuario');
      return;
    }

    if (clave === '') {
      alert('Por favor ingresa tu contraseña');
      return;
    }

    alert('¡Inicio de sesión exitoso!');
    navigate('/');
  }

  return (
    <div className="auth-wrapper">
      <h1 className="auth-title">Iniciar sesión</h1>

      <div className="auth-box">
        <form onSubmit={iniciarSesion}>
          
          <div className="form-group">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-input"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-pill">
            Iniciar sesión
          </button>

        </form>

        <div className="auth-link-text">
          <span>¿No tienes cuenta?</span>
          <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
