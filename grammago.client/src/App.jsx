import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ThemeToggle from './components/ThemeToggle';
import InfoButton from './components/InfoButton';
import MainPage from './components/MainPage';
import PersonalData from './components/PersonalData';
import Exercises from './components/Exercises';
import Users from './components/Users';

const AppContent = ({ darkMode, setDarkMode, exerciseResults, setExerciseResults }) => {
  const location = useLocation();

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      {/* Condición para mostrar el título y botón de información solo en ciertas rutas */}
      {location.pathname !== '/main' &&
        location.pathname !== '/personal-data' &&
        location.pathname !== '/exercises' &&
        location.pathname !== '/usuarios' && ( // Excluir también la ruta /usuarios
          <>
            <h1><span translate="no">GrammaGO!</span></h1>
            <InfoButton darkMode={darkMode} />
          </>
        )}
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login darkMode={darkMode} />} />
        <Route path="/register" element={<Register darkMode={darkMode} />} />
        <Route path="/main" element={<MainPage darkMode={darkMode} exerciseResults={exerciseResults} />} />
        <Route path="/personal-data" element={<PersonalData darkMode={darkMode} userId={123} />} />
        <Route path="/exercises" element={<Exercises darkMode={darkMode} setExerciseResults={setExerciseResults} />} />
        <Route path="/usuarios" element={<Users darkMode={darkMode} />} /> 
      </Routes>
    </div>
  );
};


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [exerciseResults, setExerciseResults] = useState([]); // Estado para los resultados de ejercicios

  return (
    <Router>
      <AppContent 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        exerciseResults={exerciseResults}
        setExerciseResults={setExerciseResults}
      />
    </Router>
  );
};

export default App;
