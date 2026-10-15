import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function iniciarSesion(e) {
    e.preventDefault();
    setError('');

    if (usuario.trim() === '') {
      alert('Por favor ingresa tu nombre de usuario');
      return;
    }

    if (clave === '') {
      alert('Por favor ingresa tu contraseña');
      return;
    }

    // Buscamos los usuarios guardados en localStorage
    let usuariosGuardados = [];
    try {
      usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    } catch {
      usuariosGuardados = [];
    }

    // Verificamos si el usuario existe
    const usuarioEncontrado = usuariosGuardados.find(
      (u) => u.usuario.toLowerCase() === usuario.trim().toLowerCase()
    );

    if (!usuarioEncontrado) {
      const mensajeError = 'Usuario no encontrado';
      setError(mensajeError);
      alert(mensajeError);
      return;
    }

    // Verificamos la contraseña
    if (usuarioEncontrado.clave !== clave) {
      const mensajeError = 'Contraseña incorrecta';
      setError(mensajeError);
      alert(mensajeError);
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
          
          {/* Mensaje de error visual si el usuario no está registrado */}
          {error && (
            <div className="auth-error-msg">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="login-usuario">Nombre de usuario</label>
            <input
              id="login-usuario"
              type="text"
              className="form-input"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
                if (error) setError('');
              }}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-clave">Contraseña</label>
            <input
              id="login-clave"
              type="password"
              className="form-input"
              placeholder="Ingresa tu contraseña"
              value={clave}
              onChange={(e) => {
                setClave(e.target.value);
                if (error) setError('');
              }}
              autoComplete="current-password"
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
