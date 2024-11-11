import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import PaypalButton from './PaypalButton'; 
import ExerciseLevels from './ExerciseLevels'; 
import './ExerciseLevels.css';

const MainPage = ({ darkMode }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [exerciseResults, setExerciseResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExerciseResults = async () => {
            try {
                const response = await fetch('/api/user/results', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Datos de resultados:', data);  // Verificar los datos que se están recibiendo
                    setExerciseResults(data); 
                } else {
                    console.error("Error al cargar los resultados:", response.status, response.statusText);
                    setExerciseResults([]);
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                setExerciseResults([]);
            }
        };

        fetchExerciseResults(); 
    }, []);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const goToPersonalData = () => {
        navigate('/personal-data');
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login');
    };

    return (
        <div className={`main-page-container ${darkMode ? 'dark' : ''}`}>
            <header className="main-page-header">
                <h1>Bienvenido a GrammaGO!</h1>
                <h2>Aquí podrás acceder a tus lecciones de gramática y ejercicios de inglés.</h2>
            </header>

            <section className="exercise-links">
                <p>Ejercicios de Inglés</p>
                <ExerciseLevels /> 
            </section>

            <section className="exercise-results">
                <h2>Resultados de Ejercicios</h2>
                {exerciseResults.length > 0 ? (
                    <table className="exercise-results-table">
                        <thead>
                            <tr>
                                <th>Nivel</th>
                                <th>Respuestas Correctas</th>
                                <th>Respuestas Incorrectas</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exerciseResults.map((result) => {
                                const formattedDate = result.date
                                    ? new Date(result.date).toLocaleDateString('es-ES', {
                                          day: '2-digit',
                                          month: '2-digit',
                                          year: 'numeric'
                                      })
                                    : "Fecha no disponible";

                                return (
                                    <tr key={result.id}>
                                        <td>{result.level || "No especificado"}</td>
                                        <td className="correct">{result.correctCount}</td>
                                        <td className="incorrect">{result.incorrectCount}</td>
                                        <td>{formattedDate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay resultados disponibles.</p>
                )}
            </section>

            <div className="circular-button-container">
                <button className="circular-button" onClick={toggleMenu}>☰</button>
                {menuVisible && (
                    <div className={`menu ${menuVisible ? 'show' : ''} ${darkMode ? 'dark' : ''}`}>
                        <button className="menu-item" onClick={goToPersonalData}>
                            Datos personales
                        </button>
                        <PaypalButton /> 
                        <button className="menu-item" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;
