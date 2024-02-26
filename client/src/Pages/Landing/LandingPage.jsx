import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate } from './Components/validate';
import './Landing.css';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '' });
  const [access, setAccess] = useState(false);
  const EMAIL = "demo@gmail.com";
  const PASSWORD = "123456";

  useEffect(() => {
    if (access) {
      navigate("/home");
    }
  }, [access, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = (userData) => {
    if (userData.password === PASSWORD && userData.email === EMAIL) {
      setAccess(true);
    } else {
      setAccess(false);
      setError({
        email: "Credenciales incorrectas",
        password: "Credenciales incorrectas",
      });
    }
  };

    const onClick = (e) => {
      e.preventDefault(); // Evita la recarga de la página
    
      validate(formData, setError);
    
      // Verifica si no hay errores
      if (!error.email && !error.password) {
        // Aquí puedes realizar la lógica de inicio de sesión si la validación pasa
        login(formData);
      }
    };

  return (
    <div className="landingBody">
      <form className='LandingForm'>
      <div>
      _____________LOGIN_____________
      </div>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <div className="error">{error.email}</div>

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <div className="error">{error.password}</div>

      <button className="landingButton" onClick={onClick}>
        LOGIN
      </button>
      </form>
    </div>
  );
};
