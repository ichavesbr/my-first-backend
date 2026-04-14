import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="text-center">
      <p className="text-8xl mb-4">🌸</p>
      <h1 className="text-6xl font-bold text-purple-300 mb-2">404</h1>
      <p className="text-gray-400 mb-6">Página não encontrada.</p>
      <Link to="/" className="bg-purple-300 hover:bg-purple-400 text-white px-6 py-2 rounded-xl transition">
        Voltar ao início
      </Link>
    </div>
  )
}

export { NotFound }
