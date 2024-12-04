import React, { useState, useEffect } from 'react';
import './AddExercise.css';

const AddExercise = ({ onAddExercise }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);
    const [answer, setAnswer] = useState('');
    const [level, setLevel] = useState(1);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
    }, []);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (options.some(option => option.trim() === '') || !options.includes(answer)) {
            setError("Las opciones no pueden estar vacías y la respuesta debe estar en las opciones.");
            return;
        }

        const newExercise = { 
            question, 
            options, 
            answer, 
            level 
        };

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Usuario no autenticado.");
                return;
            }

            const response = await fetch('/api/user/exercises/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newExercise),
            });

            if (response.ok) {
                alert("Ejercicio añadido con éxito");
                onAddExercise(newExercise);
                setQuestion('');
                setOptions(['', '', '']);
                setAnswer('');
                setLevel(1);
                setError('');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || "Error al añadir el ejercicio");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setError("Error de conexión al servidor");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`add-exercise-container ${darkMode ? 'dark-mode' : ''}`}>
            <h3>Añadir Ejercicio</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Enunciado:
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Escribe el enunciado"
                        required
                    />
                </label>
                {options.map((option, index) => (
                    <label key={index}>
                        Opción {index + 1}:
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Escribe la opción ${index + 1}`}
                            required
                        />
                        <label className="correct-option">
                            <input
                                type="radio"
                                value={option}
                                checked={answer === option}
                                onChange={() => setAnswer(option)}
                            />
                            Correcta
                        </label>
                    </label>
                ))}
                <label>
                    Nivel:
                    <select value={level} onChange={(e) => setLevel(parseInt(e.target.value, 10))}>
                        <option value={1}>Nivel Básico</option>
                        <option value={2}>Nivel Avanzado</option>
                    </select>
                </label>
                <button type="submit" disabled={isSubmitting}>Añadir Ejercicio</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default AddExercise;
