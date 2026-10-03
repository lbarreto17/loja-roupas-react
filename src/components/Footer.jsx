function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>STYLE</h2>

          <p>
            Moda com personalidade.
            <br />
            Monte seu estilo, do seu jeito.
          </p>
        </div>

        <div className="footer-column">
          <h3>Links</h3>

          <a href="/#inicio">Início</a>
          <a href="/#produtos">Produtos</a>
          <a href="/carrinho">Carrinho</a>
        </div>

        <div className="footer-column">
          <h3>Ajuda</h3>

          <span>Perguntas frequentes</span>
          <span>Trocas e devoluções</span>
          <span>Fale conosco</span>
        </div>

        <div className="footer-column">
          <h3>STYLE</h3>

          <span>Qualidade</span>
          <span>Conforto</span>
          <span>Personalidade</span>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 STYLE — Projeto de Desenvolvimento Híbrido
        </p>

        <p>
          Moda, estilo e personalidade.
        </p>
      </div>
    </footer>
  )
}

export default Footer