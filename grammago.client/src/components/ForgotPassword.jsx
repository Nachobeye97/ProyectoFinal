import React, { useState } from 'react';
import './forgotPassword.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (email !== confirmEmail) {
      setError('Los correos electrónicos no coinciden.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      alert('Se ha enviado un correo para restablecer tu contraseña.');
      setLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <div className={`forgot-password-container ${darkMode ? 'dark' : ''}`}>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Introduce tu correo electrónico"
          required
          disabled={loading}
        />
        <input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="Confirma tu correo electrónico"
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar correo de restablecimiento'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        <span
          onClick={() => navigate('/login')}
          className="back-to-login-link"
          style={{ cursor: 'pointer', textDecoration: 'underline', color: darkMode ? '#ffffff' : '#007bff' }}
        >
          Inicio de sesión
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;
