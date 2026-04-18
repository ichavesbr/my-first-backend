import { supabase } from "../lib/supabase"

const getUsers = async () => {
  const { data, status, error } = await supabase.from("users").select("*")
  if (error) return console.error(error)

  console.log("status: ", status)
  console.log("data: ", data)
}

const createUser = async () => {
  const { data, status, error } = await supabase
    .from("users")
    .insert([
      {
        id: "123",
        created_at: "2026-04-18 06:24:11+00",
        name: "Estudar Supabase",
        email: "abc@abc.com",
        password: "senha",
      },
    ])
    .select()
  if (error) return console.error(error)

  console.log("status createUser: ", status)
  console.log("data createUser: ", data)
}

const Protected = () => {
  createUser()
  getUsers()

  return <h1>HI protected route</h1>
}

export { Protected }
