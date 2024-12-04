import React, { useEffect, useState } from 'react';
import './Users.css';
import { useNavigate } from 'react-router-dom';

const Users = ({ darkMode }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    // Obtener lista de usuarios
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/user/all-users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    setError('Error al obtener los usuarios.');
                }
            } catch (error) {
                setError('Error de conexión con el servidor.');
            }
        };

        fetchUsers();
    }, []);

    // Función para abrir el modal
    const openModal = (userEmail) => {
        setSelectedUser(userEmail);
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    // Función para eliminar usuario
    const deleteUser = async () => {
        try {
            const response = await fetch(`/api/user/delete-all-by-email/${selectedUser}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setUsers(users.filter((user) => user.correoElectronico !== selectedUser)); // Actualiza la lista de usuarios
                alert('Usuario eliminado con éxito.');
            } else {
                const errorMessage = await response.json();
                alert(`Error al eliminar el usuario: ${errorMessage.message || 'Error desconocido.'}`);
            }
        } catch (error) {
            console.error('Error de conexión al servidor:', error);
            alert('Error de conexión al servidor.');
        } finally {
            closeModal();
        }
    };

    return (
        <div className={`users-page ${darkMode ? 'dark-mode' : ''}`}>
            <button className="back-button" onClick={() => navigate('/main')}>
                ⬅
            </button>

            <h2>Lista de Usuarios</h2>
            {error && <p className="error">{error}</p>}
            {users.length > 0 ? (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo Electrónico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.correoElectronico}</td>
                                <td>
                                <button
  onClick={() => openModal(user.correoElectronico)}
  className="delete-button"
>
  <i className="fas fa-trash-alt"></i> {/* Ícono de la papelera */}
</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No se encontraron usuarios.</p>
            )}

            {/* Modal de confirmación */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirmación</h3>
                        <p>
                            ¿Estás seguro de que deseas eliminar al usuario con correo{' '}
                            <strong>{selectedUser}</strong>?
                        </p>
                        <div className="modal-buttons">
                            <button onClick={deleteUser} className="confirm-button">
                                Sí, eliminar
                            </button>
                            <button onClick={closeModal} className="cancel-button">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
