import React from 'react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    document.body.classList.toggle('dark-mode', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.body.classList.toggle('dark-mode', newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px',
        backgroundColor: darkMode ? '#ffffff' : '#242424',
        color: darkMode ? '#242424' : '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
};

export default ThemeToggle;
