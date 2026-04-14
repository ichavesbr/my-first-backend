import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-purple-400 mb-6 text-center">Cadastro</h1>
      <input
        type="text"
        placeholder="Nome"
        className="w-full mb-3 px-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full mb-3 px-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <input
        type="password"
        placeholder="Confirmar senha"
        className="w-full mb-5 px-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <button className="w-full bg-purple-300 hover:bg-purple-400 text-white py-2 rounded-xl transition cursor-pointer">
        Criar conta
      </button>
      <p className="text-center text-sm text-gray-400 mt-4">
        Já tem conta?{" "}
        <Link to="/login" className="text-pink-400 hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  )
}

export { Register }
