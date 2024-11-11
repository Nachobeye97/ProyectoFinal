import React from 'react';
import './ExerciseItem.css'; // Asegúrate de importar el archivo CSS para los estilos

const ExerciseItem = ({ exercise, onOptionChange, selectedOption }) => {
    const handleOptionChange = (option) => {
        // Desmarcar si la opción ya está seleccionada, o marcar la nueva opción
        if (selectedOption === option) {
            onOptionChange(exercise.id, null); // Desmarcar
        } else {
            onOptionChange(exercise.id, option); // Marcar
        }
    };

    return (
        <div className="exercise-item">
            <h3>{exercise.question}</h3>
            <ul className="options-list">
                {exercise.options.map((option, index) => (
                    <li key={index} className={selectedOption === option ? 'selected' : ''}>
                        <input
                            type="checkbox" // Mantener como checkbox
                            value={option}
                            checked={selectedOption === option} // Verifica si la opción está seleccionada
                            onChange={() => handleOptionChange(option)} // Llama a la función modificada
                            id={`option-${exercise.id}-${index}`} // Asignar un ID único para cada opción
                        />
                        <label htmlFor={`option-${exercise.id}-${index}`} className="option-label">
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExerciseItem;
