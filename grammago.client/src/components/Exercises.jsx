import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ExerciseItem from './ExerciseItem';
import AddExercise from './AddExercise';
import './Exercises.css';

const Exercises = ({ setExerciseResults, darkMode }) => {
    const [exercises, setExercises] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [page, setPage] = useState(1);  // Para manejar la paginación
    const [pageSize] = useState(10);  // Tamaño de página fijo a 10

    useEffect(() => {
        const fetchExercises = async () => {
            const level = new URLSearchParams(location.search).get('level');  // Obtiene el nivel de los parámetros de la URL
            const response = await fetch(`/api/user/exercises?page=${page}&pageSize=${pageSize}&level=${level}`);
            const data = await response.json();
            setExercises(data);  // Establece los ejercicios en el estado
        };

        fetchExercises();

        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
            setIsAdmin(true);
        }
    }, [location.search, page]);  // Dependencia en location.search y page para hacer la solicitud cuando el nivel o la página cambien

    const handleOptionChange = (exerciseId, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [exerciseId]: option,
        });
    };

    const handleCheckAnswers = async () => {
        let correct = 0;
        exercises.forEach((exercise) => {
            if (selectedOptions[exercise.id] === exercise.answer) {
                correct++;
            }
        });

        const incorrect = exercises.length - correct;

        setCorrectCount(correct);
        setShowResults(true);

        const result = {
            AttemptNumber: currentExerciseIndex + 1,
            CorrectCount: correct,
            IncorrectCount: incorrect,
            DateCompleted: new Date().toISOString(),
            Level: exercises[currentExerciseIndex]?.level.toString() || 'No especificado', // Asegúrate de que sea una cadena
        };

        await saveExerciseResult(result);
        await fetchExerciseResults();  // Recargar los resultados después de guardar
    };

    const saveExerciseResult = async (result) => {
        try {
            const response = await fetch('/api/user/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(result),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error("Error al guardar los resultados:", errorDetails);
                throw new Error(errorDetails);
            }
        } catch (error) {
            console.error("Error al guardar los resultados:", error);
        }
    };

    const fetchExerciseResults = async () => {
        const response = await fetch('/api/user/results', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setExerciseResults(data); // Actualiza los resultados en el estado
        } else {
            console.error("Error al cargar los resultados:", response.status, response.statusText);
        }
    };

    const handleNext = () => {
        if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setShowResults(false);
        }
    };

    const handlePrevious = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
            setShowResults(false);
        }
    };

    const handleAddExercise = async (newExercise) => {
        try {
            const response = await fetch('/api/user/exercises/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newExercise),
            });

            if (response.ok) {
                const savedExercise = await response.json();
                setExercises([...exercises, savedExercise]);
                alert("Ejercicio añadido con éxito");
            } else {
                const errorMessage = await response.text();
                console.error(errorMessage);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div className={`exercises-container ${darkMode ? 'dark' : ''}`}>
            <button className="back-button" onClick={() => navigate('/main')}>
                ←
            </button>
            <h2 className="main-page-header">Ejercicios de inglés</h2>
            {isAdmin && <AddExercise onAddExercise={handleAddExercise} />}

            {exercises.length > 0 && (
                <ExerciseItem
                    exercise={exercises[currentExerciseIndex]}
                    onOptionChange={handleOptionChange}
                    selectedOption={selectedOptions[exercises[currentExerciseIndex].id]}
                    darkMode={darkMode}
                />
            )}

            <div>
                <button className="exercise-button" onClick={handlePrevious} disabled={currentExerciseIndex === 0}>
                    Anterior
                </button>

                {currentExerciseIndex < exercises.length - 1 && (
                    <button className="exercise-button" onClick={handleNext}>
                        Siguiente
                    </button>
                )}
            </div>

            <div className="check-answers-container">
                <button className="exercise-button" onClick={handleCheckAnswers}>Comprobar respuestas</button>
            </div>

            {showResults && (
                <div>
                    <h3>Resultados:</h3>
                    <p>Respuestas correctas: <span className="correct">{correctCount}</span></p>
                    <p>Respuestas incorrectas: <span className="incorrect">{exercises.length - correctCount}</span></p>
                    <h4>Detalles:</h4>
                    <ul className="exercise-results-table">
                        {exercises.map((exercise) => (
                            <li key={exercise.id}>
                                {exercise.question} -{' '}
                                <span style={{
                                    color: selectedOptions[exercise.id] === exercise.answer ? 'green' : 'red',
                                    fontWeight: 'bold'
                                }}>
                                    {selectedOptions[exercise.id] === exercise.answer
                                        ? `Correcta: ${exercise.answer}`
                                        : `Incorrecta, la respuesta correcta es: ${exercise.answer}`}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Exercises;
