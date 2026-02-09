import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const User = () => {
  const { id } = useParams()
  const [newUser, setNewUser] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [currentUser, setCurrentUser] = useState({})
  console.log(newUser)
  console.log(newPassword)
  const { user, password } = currentUser

  const checkDB = () => {
    fetch(`http://localhost:1000/users/${id}`)
      .then(res => res.json())
      .then(data => setCurrentUser(data[0]))
  }

  useEffect(() => {
    checkDB()
  }, [])

  const handleSubmit = (e: React.SubmitEvent<HTMLInputElement>) => {
    e.preventDefault()

    const editedUser = { user: newUser, password: newPassword }

    fetch(`http://localhost:1000/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedUser),
    }).then(() => checkDB())

    setNewUser("")
    setNewPassword("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>PAGINA DO USER - {id}</h1>
      <div className="flex justify-center items-center gap-4">
        <label htmlFor="user">user</label>
        <input
          type="text"
          value={newUser}
          placeholder={user}
          onChange={e => setNewUser(e.target.value)}
          className="border py-2 px-4"
        />

        <label htmlFor="user">password</label>
        <input
          type="text"
          placeholder={password}
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="border py-2 px-4"
        />
        <button className="bg-gray-500 p-2">EDIT</button>
      </div>
    </form>
  )
}

export { User }
