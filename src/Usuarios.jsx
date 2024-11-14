import { useEffect, useState } from "react";
import ModelTable from "./components/ModelTable";
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';

function Usuarios(){
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditId, setUsuarioEditId] = useState(null);
    const orderedCols = ["id","nombre_usuario","contrasena_hash", "is_admin"];
    const endpoint = "http://localhost:5000/usuarios"
    const token = localStorage.getItem("token");
    const campos = [
        { name: 'nombre_usuario', label: 'Nombre de Usuario', type: 'text' },
        { name: 'contrasena', label: 'Contraseña', type: 'text' },
        { 
            name: 'is_admin',
            label: 'Administrador',
            type: 'checkbox',
        }
    ];

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("http://localhost:5000/usuarios", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setUsuarios(data.usuarios);
                } else if (response.status === 403) {
                    console.error("No tienes permisos para acceder a esta página.");
                } else {
                    console.error("Error al obtener usuarios");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (token) {
            fetchUsuarios();
        } else {
            console.error("No estás autenticado.");
        }
    }, [token]);

    const handleEdit = (id) => {
        setUsuarioEditId(id); 
    };

    const handleCerrarEditForm = () => {
        setUsuarioEditId(null); 
    };

    const handleEliminar = (id) => {
        fetch(`http://localhost:5000/usuarios/eliminar/${id}`, { 
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar usuario.');
            } else {
                return response.json();
            }
        })
        .then(data => {
            alert('Usuario eliminado con éxito.');
            // Actualiza el estado para eliminar el usuario de la tabla
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al eliminar el usuario.');
        });
    };

    return (
        <div>
            <div>
                <ModelTable 
                    data={usuarios} 
                    orderedCols={orderedCols} 
                    onEdit={handleEdit}
                    onDelete={handleEliminar}
                />
            </div>
            <div>
                <CreateForm 
                    campos={campos} 
                    endpoint={endpoint}
                    token={token}
                />
            </div>
            <div>
            {usuarioEditId && (
                    <div>
                        <EditForm 
                            id={usuarioEditId}
                            campos={campos}
                            endpoint={endpoint}
                            onClose={handleCerrarEditForm}
                            token={token}
                        />
                    </div>
                )}
            </div>
        </div>

    );
};

export default Usuarios