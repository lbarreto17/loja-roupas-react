import { useState } from "react"

function ProductCard({ produto }) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("")

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={produto.imagem} alt={produto.nome} />
      </div>

      <div className="product-info">
        <span className="product-category">{produto.categoria}</span>

        <h3>{produto.nome}</h3>

        <p className="product-price">
          R$ {produto.preco.toFixed(2).replace(".", ",")}
        </p>

        <div className="product-sizes">
          <span>Tamanhos:</span>

          <div className="size-options">
            {produto.tamanhos.map((tamanho) => (
              <button
                key={tamanho}
                type="button"
                className={
                  tamanhoSelecionado === tamanho ? "size-selected" : ""
                }
                onClick={() => setTamanhoSelecionado(tamanho)}
              >
                {tamanho}
              </button>
            ))}
          </div>
        </div>

        <button className="add-cart-button" type="button">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}

export default ProductCard