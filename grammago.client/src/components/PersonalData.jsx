import React, { useState, useEffect } from 'react';
import './PersonalData.css';
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton'; // Asegúrate de importar el componente de PayPal

const PersonalData = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correoElectronico: '',
    direccion: '',
    provincia: '',
    codigoPostal: '',
  });

  const userId = localStorage.getItem('userId'); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos del usuario');
        }
        const data = await response.json();
        setFormData({
          nombre: data.nombre || '',
          apellidos: data.apellido || '',
          correoElectronico: data.correoElectronico || '',
          direccion: data.direccion || '',
          provincia: data.provincia || '',
          codigoPostal: data.codigoPostal || '',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userId) { 
      fetchData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      direccion: formData.direccion,
      provincia: formData.provincia,
      codigoPostal: formData.codigoPostal,
    };

    try {
      const response = await fetch(`/api/user/update-personal-data/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert('Datos actualizados correctamente');
      } else {
        alert('Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión con el servidor');
    }
  };

  return (
    <>
      <div className="button-container">
        <button className="back-button" onClick={() => navigate('/main')}>←</button>
      </div>
      <div className={`personal-data-container ${darkMode ? 'dark' : ''}`}>
        <h2>Datos Personales</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </label>
          <label>
            Apellidos:
            <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
          </label>
          <label>
            Correo Electrónico:
            <input type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} required />
          </label>
          <label>
            Dirección:
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
          </label>
          <label>
            Provincia:
            <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} />
          </label>
          <label>
            Código Postal:
            <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} />
          </label>
          <button type="submit">Guardar</button>
        </form>

        
       
      </div>
    </>
  );
};

export default PersonalData;
