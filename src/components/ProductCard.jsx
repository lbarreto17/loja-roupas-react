import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { adicionarProduto } from "../services/carrinhoService"

function ProductCard({ produto }) {
  const [tamanhoSelecionado, setTamanhoSelecionado] =
    useState("")

  const [mensagem, setMensagem] = useState("")

  const { usuario } = useAuth()
  const navigate = useNavigate()

  async function adicionarAoCarrinho() {
    setMensagem("")

    if (!usuario) {
      navigate("/login")
      return
    }

    if (!tamanhoSelecionado) {
      setMensagem("Selecione um tamanho.")
      return
    }

    try {
      await adicionarProduto(
        usuario.uid,
        produto,
        tamanhoSelecionado
      )

      setMensagem(
        "Produto adicionado ao carrinho!"
      )
    } catch (error) {
      console.error(
        "Erro ao adicionar produto:",
        error
      )

      setMensagem("Erro ao adicionar produto.")
    }
  }

  return (
    <article className="product-card">

      <div className="product-image">
        <span className="product-badge">
          STYLE
        </span>

        <img
          src={produto.imagem}
          alt={produto.nome}
        />
      </div>

      <div className="product-info">

        <span className="product-category">
          {produto.categoria}
        </span>

        <h3>{produto.nome}</h3>

        <p className="product-price">
          R${" "}
          {produto.preco
            .toFixed(2)
            .replace(".", ",")}
        </p>

        <div className="product-sizes">

          <span>Escolha o tamanho</span>

          <div className="size-options">
            {produto.tamanhos.map((tamanho) => (
              <button
                key={tamanho}
                type="button"
                className={
                  tamanhoSelecionado === tamanho
                    ? "size-selected"
                    : ""
                }
                onClick={() =>
                  setTamanhoSelecionado(tamanho)
                }
              >
                {tamanho}
              </button>
            ))}
          </div>

        </div>

        <button
          className="add-cart-button"
          type="button"
          onClick={adicionarAoCarrinho}
        >
          Adicionar ao carrinho
        </button>

        {mensagem && (
          <p className="cart-message">
            {mensagem}
          </p>
        )}

      </div>
    </article>
  )
}

export default ProductCard