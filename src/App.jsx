import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Inicio from './Inicio'
import Clientes from './Clientes'
import Usuarios from './Usuarios'
import Login from './Login'
import NavBar from './components/Navbar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='*' element={<Inicio />}/>
        <Route path="/clientes" element={<Clientes/>}/>
        <Route path="/usuarios" element={<Usuarios/>}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </Router>
  )
}

export default App
