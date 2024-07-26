import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Import your custom CSS
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Optional performance reporting

// Create the root element for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within React.StrictMode for additional checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Measure performance in your app
// Pass a function to log results (e.g., reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
