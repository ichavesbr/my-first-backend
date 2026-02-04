import { useState } from "react"

function App() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [serverResponse, setServerResponse] = useState([])

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handleSubmit = (e: React.SubmitEvent<HTMLInputElement>) => {
    e.preventDefault()

    const newUser = { user: user, password: password }
    fetch("http://localhost:1000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(data => setServerResponse(data))
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 m-10">
        <h1 className="text-5xl">MY BACKEND</h1>

        <form onSubmit={handleSubmit} className="flex items-center gap-4 border p-8">
          <div className="flex gap-2">
            <label htmlFor="user">User:</label>
            <input type="text" className="border" value={user} onChange={handleUser} />
          </div>

          <div className="flex gap-2">
            <label htmlFor="user">Password:</label>
            <input type="password" className="border" value={password} onChange={handlePassword} />
          </div>

          <button className="bg-amber-800 px-5 py-2">REGISTER</button>
        </form>
        <hr />
        {serverResponse}
      </div>
    </>
  )
}

export default App
