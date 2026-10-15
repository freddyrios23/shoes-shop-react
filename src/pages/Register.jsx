import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [usuario, setUsuario] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');

  const navigate = useNavigate();

  function registrarse(e) {
    e.preventDefault();

    if (usuario === '' || rut === '' || correo === '' || clave === '' || confirmarClave === '') {
      alert('Debes completar todos los campos');
      return;
    }

    if (clave !== confirmarClave) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Obtenemos los usuarios ya guardados en localStorage
    let usuarios = [];
    try {
      usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    } catch {
      usuarios = [];
    }

    // Verificamos si el usuario ya existe
    const usuarioExiste = usuarios.some(
      (u) => u.usuario.toLowerCase() === usuario.trim().toLowerCase()
    );

    if (usuarioExiste) {
      alert('Este nombre de usuario ya está registrado');
      return;
    }

    // Guardamos el nuevo usuario
    const nuevoUsuario = {
      usuario: usuario.trim(),
      rut: rut.trim(),
      correo: correo.trim(),
      clave: clave
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('¡Registro exitoso!');
    navigate('/login');
  }

  return (
    <div className="auth-wrapper">
      <h1 className="auth-title">Registrarse</h1>

      <div className="auth-box">
        <form onSubmit={registrarse}>
          
          <div className="form-group">
            <label className="form-label" htmlFor="register-usuario">Nombre de usuario</label>
            <input
              id="register-usuario"
              type="text"
              className="form-input"
              placeholder="Ej. juanperez"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-rut">RUT</label>
            <input
              id="register-rut"
              type="text"
              className="form-input"
              placeholder="12.345.678-9"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-correo">Correo electrónico</label>
            <input
              id="register-correo"
              type="email"
              className="form-input"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-clave">Contraseña</label>
            <input
              id="register-clave"
              type="password"
              className="form-input"
              placeholder="Crea tu contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-confirmar">Confirmar contraseña</label>
            <input
              id="register-confirmar"
              type="password"
              className="form-input"
              placeholder="Repite tu contraseña"
              value={confirmarClave}
              onChange={(e) => setConfirmarClave(e.target.value)}
              autoComplete="new-password"
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
