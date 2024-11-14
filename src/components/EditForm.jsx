import { useEffect, useState } from "react";
import '../assets/ModelTable.css'

function EditForm({ id, campos, endpoint, onClose, token }){
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga

    useEffect(() => {
        setLoading(true);
        fetch(`${endpoint}/editar/${id}`, {
            headers: {
                'Content-Type': 'application/json'
                ,"Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setFormData(data);
                setLoading(false);})
            .catch(error => {
                setLoading(false);
                console.error('Error obteniendo datos:', error)});
    }, [endpoint, id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Si el campo es un checkbox, asigna el valor de 'checked'
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre_usuario || formData.nombre_usuario.trim() === "") {
            alert("El nombre de usuario es obligatorio.");
            return;
        }

        console.log("Datos enviados:",formData)
        fetch(`${endpoint}/editar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json(), window.location.reload())
        .then(() => onClose(), alert("Datos actualizados con exito."))
        .catch(error => console.error('Error al actualizar datos:', error));
    };


    if (loading) {
        return <div>Loading...</div>; // Muestra un mensaje de carga
    }

    
return(
    <div className="container-form">
        <form className="editForm" onSubmit={handleSubmit}>
            <h2>Editar</h2>
            {campos.map(campo => (
                <div key={campo.name}>
                    <label>{campo.label}:</label>
                    {campo.type === 'checkbox' ? (
                            <input
                                type="checkbox"
                                name={campo.name}
                                checked={formData[campo.name] || false}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type={campo.type}
                                name={campo.name}
                                value={formData[campo.name] || ''}
                                onChange={handleChange}
                            />
                        )}
                </div>
            ))}
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
        </form>
    </div>
)
}

export default EditForm