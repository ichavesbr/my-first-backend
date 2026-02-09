import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function App() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [serverResponse, setServerResponse] = useState([])

  const checkDB = () => {
    fetch("http://localhost:1000/users")
      .then(res => res.json())
      .then(data => setServerResponse(data))
  }

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const handleSubmit = (e: React.SubmitEvent<HTMLInputElement>) => {
    e.preventDefault()

    const newUser = { user: user, password: password }

    fetch("http://localhost:1000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).then(() => checkDB())

    setUser("")
    setPassword("")
  }

  const handleDelete = (id: number) => {
    fetch(`http://localhost:1000/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "Authorization" },
      body: JSON.stringify(id),
    }).then(() => checkDB())
  }

  useEffect(() => {
    checkDB()
  }, [])

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 m-10">
        <h1 className="text-5xl">MY BACKEND</h1>

        <form onSubmit={handleSubmit} className="flex items-center gap-4 border p-8">
          <div className="flex gap-2">
            <label id="user">User:</label>
            <input type="text" className="border" value={user} onChange={handleUser} />
          </div>

          <div className="flex gap-2">
            <label id="password">Password:</label>
            <input type="password" className="border" value={password} onChange={handlePassword} />
          </div>

          <button className="bg-amber-800 px-5 py-2">REGISTER</button>
        </form>
        <hr />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="text-4xl mb-4">Usuários cadastrados</div>
        {serverResponse.map(({ id, user, password }, index) => (
          <div key={index} className="flex gap-4 justify-center items-center m-2 p-2 bg-gray-600">
            <div>{id}</div>
            <div>{user}</div>
            <div>{password}</div>

            <Link to={`/users/${id}`}>EDIT</Link>

            <button onClick={() => handleDelete(id)} className="bg-amber-600 p-1">
              DELETE
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
