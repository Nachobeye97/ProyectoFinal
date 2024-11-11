import React from 'react';
import './InfoButton.css'; 

const InfoButton = ({ darkMode }) => {
  const [isFlipped, setIsFlipped] = React.useState(false); 

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`info-button-container ${isFlipped ? 'flipped' : ''} ${darkMode ? 'dark' : ''}`}
      onClick={handleFlip}
      aria-expanded={isFlipped} 
      role="button"
    >
      <div className="info-button-front">
        <button className="info-button-front">Info</button>
      </div>
      <div className="info-button-back">
        <p>
          GrammaGO! es una plataforma interactiva diseñada para ayudar a los estudiantes a mejorar
          su dominio del inglés mediante ejercicios de gramática en formato tipo test.
        </p>
      </div>
    </div>
  );
};

export default InfoButton;
