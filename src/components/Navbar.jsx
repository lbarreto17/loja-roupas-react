function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo">STYLE</h1>

        <nav className="nav-links">
          <a href="#inicio">Início</a>
          <a href="#produtos">Produtos</a>
          <a href="#carrinho">Carrinho</a>
          <a href="#login">Entrar</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar