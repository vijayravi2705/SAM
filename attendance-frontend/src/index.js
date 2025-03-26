import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS animations
AOS.init();

// Function to dynamically track cursor movement and update CSS variables
document.addEventListener("mousemove", (event) => {
  document.documentElement.style.setProperty("--cursorX", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursorY", `${event.clientY}px`);
});

// Create React root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals();
