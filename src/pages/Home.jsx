import { useState } from "react"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Footer from "../components/Footer"
import produtos from "../data/produtos"

function Home() {
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Todos")

  const categorias = [
    "Todos",
    "Camisetas",
    "Moletons",
    "Calças",
    "Bermudas",
    "Jaquetas",
  ]

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter(
          (produto) =>
            produto.categoria === categoriaSelecionada
        )

  return (
    <>
      <Navbar />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <p className="hero-subtitle">NOVA COLEÇÃO</p>

            <h1>
              Vista seu <span>estilo.</span>
            </h1>

            <p className="hero-description">
              Encontre peças que combinam com você e monte seu próprio estilo.
            </p>

            <a href="#produtos" className="hero-button">
              Ver produtos →
            </a>
          </div>

          <div className="hero-details">
            <div>
              <strong>Entrega</strong>
              <span>Para todo o Brasil</span>
            </div>

            <div>
              <strong>Pagamento</strong>
              <span>Compra segura</span>
            </div>

            <div>
              <strong>Estilo</strong>
              <span>Peças selecionadas</span>
            </div>

            <div>
              <strong>Qualidade</strong>
              <span>Em cada detalhe</span>
            </div>
          </div>
        </section>

        <section className="products-section" id="produtos">
          <div className="section-title">
            <p>CONHEÇA NOSSA COLEÇÃO</p>

            <h2>Produtos em destaque</h2>

            <span>
              Peças selecionadas para você montar seu estilo.
            </span>
          </div>

          <div className="category-tags">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                className={
                  categoriaSelecionada === categoria
                    ? "category-active"
                    : ""
                }
                onClick={() =>
                  setCategoriaSelecionada(categoria)
                }
              >
                {categoria}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {produtosFiltrados.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home