import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useAuth } from "../context/AuthContext"

function Navbar() {
   const {usuario } = useAuth()
   async function sair() {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Erro ao sair:", error)
  }
}
  return (
    
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo">STYLE</h1>

        <nav className="nav-links">
          <a href="#inicio">Início</a>
          <a href="#produtos">Produtos</a>
          <Link to="/carrinho">Carrinho</Link>
          {usuario ? (
  <button type="button" onClick={sair}>
    Sair
  </button>
) : (
  <Link to="/login">Entrar</Link>
)}
        </nav>
      </div>
    </header>
    
  )
}

export default Navbar
