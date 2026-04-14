import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-brand-primary mb-6 text-center">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 rounded-xl border border-brand-primary-muted focus:outline-none focus:ring-2 focus:ring-brand-primary-light"
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full mb-5 px-4 py-2 rounded-xl border border-brand-primary-muted focus:outline-none focus:ring-2 focus:ring-brand-primary-light"
      />
      <button className="w-full bg-brand-primary-light hover:bg-brand-primary text-white py-2 rounded-xl transition cursor-pointer">
        Entrar
      </button>
      <p className="text-center text-sm text-gray-400 mt-4">
        Não tem conta?{" "}
        <Link to="/cadastro" className="text-brand-accent hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}

export { Login }
