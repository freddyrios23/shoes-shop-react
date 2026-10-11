import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');

  const navigate = useNavigate();

  function registrarse(e) {
    e.preventDefault();

    if (usuario === '' || correo === '' || clave === '' || confirmarClave === '') {
      alert('Debes completar todos los campos');
      return;
    }

    if (clave !== confirmarClave) {
      alert('Las contraseñas no coinciden');
      return;
    }

    alert('¡Registro exitoso!');
    navigate('/login');
  }

  return (
    <div className="auth-wrapper">
      <h1 className="auth-title">Registrarse</h1>

      <div className="auth-box">
        <form onSubmit={registrarse}>
          
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
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-input"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
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

          <div className="form-group">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-input"
              value={confirmarClave}
              onChange={(e) => setConfirmarClave(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-pill">
            Registrarse
          </button>

        </form>

        <div className="auth-link-text">
          <span>¿Ya tienes cuenta?</span>
          <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
