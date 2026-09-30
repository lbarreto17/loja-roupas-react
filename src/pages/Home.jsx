import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Footer from "../components/Footer"
import produtos from "../data/produtos"

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <p className="hero-subtitle">NOVA COLEÇÃO</p>

            <h2>Vista seu estilo.</h2>

            <p>
              Encontre peças que combinam com você e monte seu próprio estilo.
            </p>

            <a href="#produtos" className="hero-button">
              Ver produtos
            </a>
          </div>
        </section>

        <section className="products-section" id="produtos">
          <div className="section-title">
            <p>CONHEÇA NOSSA COLEÇÃO</p>
            <h2>Produtos em destaque</h2>
          </div>

          <div className="products-grid">
            {produtos.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home