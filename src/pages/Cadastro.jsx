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
      await createUserWithEmailAndPassword(auth, email, senha)
      navigate("/")
    } catch (error) {
      console.error(error)
      setErro("Não foi possível realizar o cadastro.")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>STYLE</h1>
        <h2>Criar conta</h2>

        <form onSubmit={cadastrar}>
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
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength="6"
          />

          {erro && <p className="auth-error">{erro}</p>}

          <button type="submit">
            Criar conta
          </button>
        </form>

        <p>
          Já possui uma conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}

export default Cadastro
