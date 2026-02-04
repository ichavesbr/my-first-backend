import { useState } from "react"

function App() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handleSubmit = (e: React.SubmitEvent<HTMLInputElement>) => {
    e.preventDefault()

    const newUser = { user: user, password: password }

    console.log("form enviado", newUser)
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
      </div>
    </>
  )
}

export default App
