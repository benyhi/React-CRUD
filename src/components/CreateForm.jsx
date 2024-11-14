import React, { useState } from 'react';
import '../assets/ModelTable.css'

function CreateForm({ campos, endpoint, token }) {
    const [formData, setFormData] = useState(
        campos.reduce((acc, field) => ({ ...acc, [field.name]: field.type === 'checkbox' ? false : '' }), {})
    );

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
            const response = await fetch(`${endpoint}/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al crear la entrada.');
            }
            const data = await response.json();
            window.location.reload()
            alert('Nueva entrada cargada exitosamente.');
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al crear la entrada.');
        }
    };

return (
    <div className='form-container'>
    <h2>Añadir un nuevo registro</h2>
    <form className='createForm' onSubmit={handleSubmit}>
        {campos.map((field) => (
            <div key={field.name} style={{ marginBottom: '1em' }}>
                <label htmlFor={field.name}>{field.label}</label>
                {/* Verifica si el tipo es select */}
                {field.type === 'select' ? (
                    <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona una opción</option>
                        {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : field.type === 'checkbox' ? (
                    <input
                        type="checkbox"
                        id={field.name}
                        name={field.name}
                        checked={formData[field.name]}
                        onChange={handleChange}
                    />
                ) : (
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                    />
                )}
            </div>
        ))}
        <button type="submit">Cargar</button>
    </form>
    </div>
)};  

export default CreateForm;
