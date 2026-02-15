import { useNavigate } from "react-router-dom"

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-50">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-200 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">BEM VINDO</h1>
        <button
          onClick={() => navigate("/")}
          className="inline-block bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
          Voltar
        </button>
      </div>
    </div>
  )
}

export default Welcome
