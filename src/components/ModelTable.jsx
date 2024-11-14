import '../assets/ModelTable.css'

function ModelTable({data, orderedCols, onEdit, onDelete}){
    // Obtiene las claves del JSON y los guarda en un array como las columnas de la tabla.
    // const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const columns = data.length > 0 
        ? orderedCols.filter(col => col in data[0]) // Solo toma las columnas que existen en los datos
        : [];
        
    return(
        <div className='container'>
            <div className='container-tabla'>
                <table className='modelTable'>
                    <thead>
                        <tr>
                            {columns.map((col) =>(
                                <th key={col}>{col}</th>
                            ))}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody> {/* Itera sobre los datos */}
                            {/* Crea una fila de la tabla para cada elemento en `data` */}
                        {data.map((row, rowIndex) =>( 
                            <tr key={row.id}>
                                {columns.map((col) => (
                                    <td key={`${rowIndex}-${col}`}> {/* Crea una celda para cada columna en la fila */}
                                        {/* Verifica si el valor es una contraseña hasheada */}
                                        {col === 'contrasena_hash' 
                                        ? `${row[col].slice(0, 15)}...`  // Trunca a 15 caracteres y agrega '...'
                                        : typeof row[col] === 'object' && row[col] !== null
                                        ? row[col].nombre // Si es un objeto, muestra su propiedad `nombre`
                                        : typeof row[col] === 'boolean'
                                        ? row[col] ? 'Sí' : 'No' 
                                        : row[col]}
                                    </td>
                                ))}
                                <button id='editar' onClick={()=> onEdit(row.id)}>Editar</button>
                                <button id='eliminar' onClick={()=> onDelete(row.id)}>Eliminar</button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModelTable