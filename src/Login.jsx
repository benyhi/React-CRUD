import React, { useState } from 'react';
import './assets/Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [nombre_usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre_usuario, contrasena }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token",data.Token);
                alert("Login exitoso")
                navigate('/home');
            } else {
                alert("Login fallido")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }; 

    return (
        <div className='container'>
            <h2>Iniciar Sesion</h2>
            <div>
            <form onSubmit={handleSubmit}>
                <input className='inputForm' type="text" value={nombre_usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Usuario" />
                <input className='inputForm' type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Contraseña" />
                <button className='btnForm' type="submit">Iniciar Sesion</button>
            </form>
            </div>
        </div>
    );
}

export default Login;
