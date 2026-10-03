import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"

function Cadastro() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  async function cadastrar(e) {
    e.preventDefault()
    setErro("")

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      )

      navigate("/")
    } catch (error) {
      console.error(error)

      setErro(
        "Não foi possível realizar o cadastro."
      )
    }
  }

  return (
    <main className="auth-page">

      <section className="auth-presentation">
        <Link to="/" className="auth-logo">
          STYLE
        </Link>

        <div className="auth-presentation-content">
          <span>FAÇA PARTE</span>

          <h1>Crie seu estilo.</h1>

          <p>
            Crie sua conta e monte uma coleção
            que combine com você.
          </p>
        </div>
      </section>

      <section className="auth-form-area">

        <div className="auth-card">

          <div className="auth-heading">
            <p>STYLE</p>
            <h2>Criar conta</h2>

            <span>
              Comece sua experiência com a gente
            </span>
          </div>

          <form onSubmit={cadastrar}>

            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <label htmlFor="senha">
              Senha
            </label>

            <input
              id="senha"
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              required
              minLength="6"
            />

            {erro && (
              <p className="auth-error">
                {erro}
              </p>
            )}

            <button type="submit">
              Criar conta
            </button>
          </form>

          <p className="auth-switch">
            Já possui uma conta?{" "}
            <Link to="/login">
              Entrar
            </Link>
          </p>

          <Link
            to="/"
            className="auth-back"
          >
            ← Voltar para a loja
          </Link>

        </div>
      </section>

    </main>
  )
}

export default Cadastro