import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
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
        preco: Number(item.preco) || 0,
        quantidade: Number(item.quantidade) || 1
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

    const novaQuantidade =
      Number(item.quantidade) + 1

    // Atualiza a tela imediatamente
    setItens((itensAtuais) =>
      itensAtuais.map((produto) =>
        produto.id === item.id
          ? {
              ...produto,
              quantidade: novaQuantidade
            }
          : produto
      )
    )

    try {
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

      await carregarCarrinho()
    }
  }

  // ==============================
  // DIMINUIR QUANTIDADE
  // ==============================

  async function diminuir(item) {
    if (!usuario) return

    const quantidadeAtual =
      Number(item.quantidade)

    if (quantidadeAtual <= 1) return

    const novaQuantidade =
      quantidadeAtual - 1

    // Atualiza a tela imediatamente
    setItens((itensAtuais) =>
      itensAtuais.map((produto) =>
        produto.id === item.id
          ? {
              ...produto,
              quantidade: novaQuantidade
            }
          : produto
      )
    )

    try {
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
  // RESUMO DO PEDIDO
  // ==============================

  const resumo = useMemo(() => {
    return itens.reduce(
      (resultado, item) => {
        const preco =
          Number(item.preco) || 0

        const quantidade =
          Number(item.quantidade) || 0

        resultado.quantidade +=
          quantidade

        resultado.total +=
          preco * quantidade

        return resultado
      },
      {
        quantidade: 0,
        total: 0
      }
    )
  }, [itens])

  // ==============================
  // USUÁRIO NÃO LOGADO
  // ==============================

  if (!usuario) {
    return (
      <>
        <Navbar />

        <main className="cart-page">
          <div className="cart-empty">
            <span className="cart-eyebrow">
              STYLE
            </span>

            <h1>Seu carrinho</h1>

            <p>
              Entre na sua conta para visualizar
              seus produtos.
            </p>

            <Link to="/login">
              Entrar na minha conta
            </Link>
          </div>
        </main>

        <Footer />
      </>
    )
  }

  // ==============================
  // CARREGANDO
  // ==============================

  if (carregando) {
    return (
      <>
        <Navbar />

        <main className="cart-page">
          <div className="cart-empty">
            <p>Carregando carrinho...</p>
          </div>
        </main>

        <Footer />
      </>
    )
  }

  // ==============================
  // CARRINHO VAZIO
  // ==============================

  if (itens.length === 0) {
    return (
      <>
        <Navbar />

        <main className="cart-page">
          <div className="cart-empty">
            <span className="cart-eyebrow">
              SUA SELEÇÃO
            </span>

            <h1>
              Seu carrinho está vazio.
            </h1>

            <p>
              Explore nossa coleção e encontre
              peças que combinam com você.
            </p>

            <Link to="/#produtos">
              Explorar coleção
            </Link>
          </div>
        </main>

        <Footer />
      </>
    )
  }

  // ==============================
  // CARRINHO
  // ==============================

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <div className="cart-container">

          <div className="cart-heading">
            <div>
              <span className="cart-eyebrow">
                SUA SELEÇÃO
              </span>

              <h1>Seu carrinho</h1>

              <p>
                Confira os produtos escolhidos
                antes de finalizar.
              </p>
            </div>

            <Link
              to="/#produtos"
              className="continue-shopping"
            >
              ← Continuar comprando
            </Link>
          </div>

          <div className="cart-layout">

            {/* LISTA DE PRODUTOS */}

            <div className="cart-list">

              {itens.map((item) => {
                const preco =
                  Number(item.preco) || 0

                const quantidade =
                  Number(item.quantidade) || 0

                const subtotal =
                  preco * quantidade

                return (
                  <article
                    className="cart-item"
                    key={item.id}
                  >

                    <div className="cart-image">
                      <img
                        src={item.imagem}
                        alt={item.nome}
                      />
                    </div>

                    <div className="cart-item-info">

                      <span>STYLE</span>

                      <h2>
                        {item.nome}
                      </h2>

                      <p>
                        Tamanho:{" "}
                        <strong>
                          {item.tamanho}
                        </strong>
                      </p>

                      <p>
                        Preço unitário: R${" "}
                        {preco
                          .toFixed(2)
                          .replace(".", ",")}
                      </p>

                      <strong className="item-subtotal">
                        Subtotal: R${" "}
                        {subtotal
                          .toFixed(2)
                          .replace(".", ",")}
                      </strong>

                    </div>

                    <div className="cart-actions">

                      <div className="cart-quantity">

                        <button
                          type="button"
                          onClick={() =>
                            diminuir(item)
                          }
                        >
                          −
                        </button>

                        <span>
                          {quantidade}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            aumentar(item)
                          }
                        >
                          +
                        </button>

                      </div>

                      <button
                        type="button"
                        className="remove-button"
                        onClick={() =>
                          remover(item.id)
                        }
                      >
                        Remover
                      </button>

                    </div>

                  </article>
                )
              })}

            </div>

            {/* RESUMO DO PEDIDO */}

            <aside className="cart-summary">

              <span className="cart-eyebrow">
                RESUMO
              </span>

              <h2>
                Resumo do pedido
              </h2>

              <div className="summary-line">
                <span>Produtos</span>

                <span>
                  {resumo.quantidade}
                </span>
              </div>

              <div className="summary-line">
                <span>Entrega</span>

                <span>
                  A calcular
                </span>
              </div>

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  R${" "}
                  {resumo.total
                    .toFixed(2)
                    .replace(".", ",")}
                </strong>
              </div>

              <button
                type="button"
                className="checkout-button"
              >
                Finalizar compra
              </button>

              <small>
                Ambiente demonstrativo —
                projeto acadêmico.
              </small>

            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Carrinho