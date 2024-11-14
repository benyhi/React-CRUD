import { useEffect, useState } from 'react';
import ModelTable from './components/ModelTable'
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';

function Clientes(){
    const [clientes, setClientes] = useState([]);
    const [clienteEditId, setClienteEditId] = useState(null);
    const [error, setError] = useState(null);
    const orderedCols = ["id", "nombre", "dni", "telefono", "email", "direccion"]
    const endpoint = "http://localhost:5000/clientes"
    const token = localStorage.getItem("token");
    const campos = [
        { name: 'nombre', label: 'Nombre', type: 'text'},
        { name: 'dni', label: 'DNI', type: 'text'},
        { name: 'telefono', label: 'Telefono', type: 'text'},
        { name: 'email', label: 'Email', type: 'email'},
        { name: 'direccion', label: 'Direccion', type: 'text'}
    ];

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch("http://localhost:5000/clientes", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setClientes(data.clientes);
                } else if (response.status === 403) {
                    setError("No tienes permisos para acceder a esta página.");
                } else if (response.status === 401) {
                    setError("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
                } else {
                    setError("Error al obtener clientes.");
                }
            } catch (error) {
                setError("Error al conectar con el servidor.");
            }
        };

        if (token) {
            fetchClientes();
        } else {
            console.error("No estás autenticado.");
        }
    }, [token]);
    
    const handleEdit = (id) => {
        setClienteEditId(id); 
    };

    const handleCerrarEditForm = () => {
        setClienteEditId(null); 
    };

    const handleEliminar = (id) => {
        fetch(`http://localhost:5000/clientes/eliminar/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    setError("No tienes permisos para eliminar este cliente.");
                } else {
                    setError("Error al eliminar cliente.");
                }
                throw new Error('Error al eliminar cliente.');
            } else {
                return response.json();
            }
        })
        .then(data => {
            alert('Cliente eliminado con éxito.');
            // Actualiza el estado para eliminar el cliente de la tabla
            setClientes(clientes.filter(cliente => cliente.id !== id));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            
            <div>
                <ModelTable
                    data={clientes}
                    orderedCols={orderedCols}
                    onEdit={handleEdit}
                    onDelete={handleEliminar}
                    token={token}
                />
            </div>
            <div>
                <CreateForm
                    campos={campos}
                    endpoint={endpoint}
                    token={token}
                />
            </div>
            {clienteEditId && (
                <div>
                    <EditForm
                        id={clienteEditId}
                        campos={campos}
                        endpoint={endpoint}
                        onClose={handleCerrarEditForm}
                        token={token}
                    />
                </div>
            )}
        </div>
    );
};

export default Clientes