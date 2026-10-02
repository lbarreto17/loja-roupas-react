import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

import {
  atualizarQuantidade,
  buscarCarrinho,
  removerProduto
} from "../services/carrinhoService"

function Carrinho() {
  const { usuario } = useAuth()

  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)

  // ==============================
  // CARREGAR CARRINHO
  // ==============================

  async function carregarCarrinho() {
    if (!usuario) {
      setItens([])
      setCarregando(false)
      return
    }

    try {
      const dados = await buscarCarrinho(usuario.uid)

      const dadosFormatados = dados.map((item) => ({
        ...item,
        preco: Number(item.preco),
        quantidade: Number(item.quantidade)
      }))

      setItens(dadosFormatados)
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarCarrinho()
  }, [usuario])

  // ==============================
  // AUMENTAR QUANTIDADE
  // ==============================

  async function aumentar(item) {
    if (!usuario) return

    const novaQuantidade = Number(item.quantidade) + 1

    // Atualiza a tela imediatamente
    setItens((itensAtuais) =>
      itensAtuais.map((produto) => {
        if (produto.id === item.id) {
          return {
            ...produto,
            quantidade: novaQuantidade
          }
        }

        return produto
      })
    )

    try {
      // Atualiza também no Firestore
      await atualizarQuantidade(
        usuario.uid,
        item.id,
        novaQuantidade
      )
    } catch (error) {
      console.error(
        "Erro ao aumentar quantidade:",
        error
      )

      // Se ocorrer erro, busca novamente
      // os dados salvos no Firestore
      await carregarCarrinho()
    }
  }

  // ==============================
  // DIMINUIR QUANTIDADE
  // ==============================

  async function diminuir(item) {
    if (!usuario) return

    const quantidadeAtual = Number(item.quantidade)

    if (quantidadeAtual <= 1) {
      return
    }

    const novaQuantidade = quantidadeAtual - 1

    // Atualiza a tela imediatamente
    setItens((itensAtuais) =>
      itensAtuais.map((produto) => {
        if (produto.id === item.id) {
          return {
            ...produto,
            quantidade: novaQuantidade
          }
        }

        return produto
      })
    )

    try {
      // Atualiza também no Firestore
      await atualizarQuantidade(
        usuario.uid,
        item.id,
        novaQuantidade
      )
    } catch (error) {
      console.error(
        "Erro ao diminuir quantidade:",
        error
      )

      await carregarCarrinho()
    }
  }

  // ==============================
  // REMOVER PRODUTO
  // ==============================

  async function remover(itemId) {
    if (!usuario) return

    // Remove imediatamente da tela
    setItens((itensAtuais) =>
      itensAtuais.filter(
        (produto) => produto.id !== itemId
      )
    )

    try {
      // Remove também do Firestore
      await removerProduto(
        usuario.uid,
        itemId
      )
    } catch (error) {
      console.error(
        "Erro ao remover produto:",
        error
      )

      await carregarCarrinho()
    }
  }

  // ==============================
  // CALCULAR TOTAL
  // ==============================

  const total = itens.reduce(
    (soma, item) => {
      const preco = Number(item.preco)
      const quantidade = Number(item.quantidade)

      return soma + preco * quantidade
    },
    0
  )

  // ==============================
  // USUÁRIO NÃO LOGADO
  // ==============================

  if (!usuario) {
    return (
      <main className="cart-page">

        <div className="cart-empty">

          <h1>Seu carrinho</h1>

          <p>
            Entre na sua conta para visualizar seu carrinho.
          </p>

          <Link to="/login">
            Entrar
          </Link>

        </div>

      </main>
    )
  }

  // ==============================
  // CARREGANDO
  // ==============================

  if (carregando) {
    return (
      <main className="cart-page">

        <p>
          Carregando carrinho...
        </p>

      </main>
    )
  }

  // ==============================
  // CARRINHO VAZIO
  // ==============================

  if (itens.length === 0) {
    return (
      <main className="cart-page">

        <div className="cart-empty">

          <h1>Seu carrinho</h1>

          <p>
            Seu carrinho está vazio.
          </p>

          <Link to="/">
            Ver produtos
          </Link>

        </div>

      </main>
    )
  }

  // ==============================
  // EXIBIR CARRINHO
  // ==============================

  return (
    <main className="cart-page">

      <div className="cart-container">

        <h1>Seu carrinho</h1>

        <div className="cart-list">

          {itens.map((item) => {
            const preco = Number(item.preco)
            const quantidade = Number(item.quantidade)
            const subtotal = preco * quantidade

            return (
              <div
                className="cart-item"
                key={`${item.id}-${item.quantidade}`}
              >

                <img
                  src={item.imagem}
                  alt={item.nome}
                />

                <div className="cart-item-info">

                  <h2>
                    {item.nome}
                  </h2>

                  <p>
                    Tamanho: {item.tamanho}
                  </p>

                  <p>
                    Preço unitário: R${" "}
                    {preco
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>

                  <p>
                    Subtotal: R${" "}
                    {subtotal
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>

                  

                </div>

                <div className="cart-quantity">

                  <button
                    type="button"
                    onClick={() => diminuir(item)}
                  >
                    -
                  </button>

                  <span>
                    {quantidade}
                  </span>

                  <button
                    type="button"
                    onClick={() => aumentar(item)}
                  >
                    +
                  </button>

                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => remover(item.id)}
                >
                  Remover
                </button>

              </div>
            )
          })}

        </div>

        <div
          className="cart-total"
          key={total}
        >
          Total: R${" "}
          {total
            .toFixed(2)
            .replace(".", ",")}
        </div>

      </div>

    </main>
  )
}

export default Carrinho