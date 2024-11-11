import React, { useState } from 'react';

const AddExercise = ({ onAddExercise }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);
    const [answer, setAnswer] = useState('');
    const [level, setLevel] = useState(1); // Nivel por defecto: 1 (Básico)
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de opciones y respuesta correcta
        if (options.some(option => option.trim() === '') || !options.includes(answer)) {
            setError("Las opciones no pueden estar vacías y la respuesta debe estar en las opciones.");
            return;
        }

        const newExercise = { 
            question, 
            options, 
            answer, 
            level // `level` ya es un número entero
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
                // Limpiar el formulario
                setQuestion('');
                setOptions(['', '', '']);
                setAnswer('');
                setLevel(1); // Resetear al nivel básico por defecto
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
        <form onSubmit={handleSubmit}>
            <p>Añadir Ejercicio</p>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enunciado"
                required
            />
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Opción ${index + 1}`}
                        required
                    />
                    <label>
                        <input
                            type="radio"
                            value={option}
                            checked={answer === option}
                            onChange={() => setAnswer(option)}
                        />
                        Correcta
                    </label>
                </div>
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
    );
};

export default AddExercise;
