import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de autenticação
    navigate("/welcome")
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de registro
    navigate("/welcome")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-lineara-to-br from-slate-50 to-blue-50">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo</h1>
          <p className="text-slate-600">Faça login ou cadastre-se para continuar</p>
        </div>
        <div className="flex justify-center mb-6 border-b border-slate-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`hover:cursor-pointer px-6 py-3 text-sm font-medium transition-colors duration-200 ${
              isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"
            }`}>
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`hover:cursor-pointer px-6 py-3 text-sm font-medium transition-colors duration-200 ${
              !isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"
            }`}>
            Cadastro
          </button>
        </div>

        {isLogin ? (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6 text-slate-800">Entrar na conta</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="mt-1 block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="mt-1 block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="hover:cursor-pointer w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm">
                Entrar
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6 text-slate-800">Criar conta</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="register-name" className="block text-sm font-medium text-slate-700 mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="register-name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  className="mt-1 block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="register-email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className="mt-1 block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="register-password" className="block text-sm font-medium text-slate-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="mt-1 block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="register-confirm-password" className="block text-sm font-medium text-slate-700 mb-1">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  id="register-confirm-password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  className="mt-1 block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="hover:cursor-pointer w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm">
                Criar conta
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
