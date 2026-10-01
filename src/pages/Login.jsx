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
      await signInWithEmailAndPassword(auth, email, senha)
      navigate("/")
    } catch (error) {
      console.error(error)
      setErro("E-mail ou senha inválidos.")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>STYLE</h1>
        <h2>Entrar</h2>

        <form onSubmit={entrar}>
          <label>E-mail</label>

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p className="auth-error">{erro}</p>}

          <button type="submit">
            Entrar
          </button>
        </form>

        <p>
          Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}

export default Login