import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(''); 

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correoElectronico: email, contrasena: password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Almacenar el token y otros datos del usuario en localStorage
        localStorage.setItem('token', data.token); // Almacenar el token
        localStorage.setItem('userId', data.userId); // Almacenar el ID del usuario
        localStorage.setItem('userRole', data.role); // Almacenar el rol
        
        
        navigate('/main'); 
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Error en el inicio de sesión.'); 
      }
    } catch (error) {
      setError("Hubo un error al intentar iniciar sesión."); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={`login-container ${darkMode ? 'dark' : ''}`}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          disabled={loading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>


      <p>
        ¿No tienes cuenta?{' '}
        <span onClick={() => navigate('/register')} className="register-link">
          Regístrate aquí
        </span>
      </p>
    </div>
  );
};

export default Login;
