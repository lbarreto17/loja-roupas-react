import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  async function entrar(e) {
    e.preventDefault()
    setErro("")

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      )

      navigate("/")
    } catch (error) {
      console.error(error)
      setErro("E-mail ou senha inválidos.")
    }
  }

  return (
    <main className="auth-page">

      <section className="auth-presentation">
        <Link to="/" className="auth-logo">
          STYLE
        </Link>

        <div className="auth-presentation-content">
          <span>NOVA COLEÇÃO</span>

          <h1>Bem-vindo de volta!</h1>

          <p>
            Acesse sua conta para continuar
            montando seu estilo.
          </p>
        </div>
      </section>

      <section className="auth-form-area">
        <div className="auth-card">

          <div className="auth-heading">
            <p>STYLE</p>
            <h2>Entrar</h2>
            <span>
              Acesse sua conta para continuar
            </span>
          </div>

          <form onSubmit={entrar}>

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
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              required
            />

            {erro && (
              <p className="auth-error">
                {erro}
              </p>
            )}

            <button type="submit">
              Entrar
            </button>
          </form>

          <p className="auth-switch">
            Não possui conta?{" "}
            <Link to="/cadastro">
              Cadastre-se
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

export default Login