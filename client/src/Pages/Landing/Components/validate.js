export const validate = (data, setError) => {
    setError((prevError) => ({
      ...prevError,
      email: !data.email ? "Email vacío" : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(data.email)
        ? ""
        : "Formato de email incorrecto",
      password: !data.password ? "Password vacío" : /^(?=.*[0-9])[a-zA-Z0-9]{6,10}$/.test(data.password)
        ? ""
        : "La contraseña debe tener al menos un número y tener una longitud entre 6 y 10 caracteres",
    }));
  };
  