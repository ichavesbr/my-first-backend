import z from "zod"
import { useForm } from "@tanstack/react-form"
import { Link } from "react-router-dom"
import { supabaseClient } from "../lib/supabaseClient"
import { useState } from "react"

const buttonStyle =
  "w-full bg-brand-primary-light hover:bg-brand-primary text-white py-2 rounded-xl transition cursor-pointer"
const inputStyle =
  "w-full mb-3 px-4 py-2 rounded-xl border border-brand-primary-muted focus:outline-none focus:ring-2 focus:ring-brand-primary-light"
const inputErrorStyle = "border-red-400 focus:ring-red-300"
const inputSelectedStyle = "border-brand-primary-muted focus:ring-brand-primary-light"

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be the same" }),
})

const Register = () => {
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const { Field, handleSubmit } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    onSubmit: async ({ value }) => console.log(value),
    validators: { onSubmit: formSchema, onBlur: formSchema },
  })

  type FieldProps<T extends string | number> = {
    state: { value: T; meta: { errors: ({ message: string } | undefined)[]; isTouched: boolean } }
    handleChange: (value: T) => void
    handleBlur: () => void
  }

  const TextField = ({
    field,
    type,
    placeholder,
  }: {
    field: FieldProps<string>
    type?: string
    placeholder?: string
  }) => {
    const { errors, isTouched } = field.state.meta
    const hasError = errors.length > 0 && isTouched
    return (
      <div className="mb-4">
        <input
          type={type}
          value={field.state.value}
          onChange={e => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          className={`${inputStyle} ${hasError ? inputErrorStyle : inputSelectedStyle}`}
        />
        {hasError && <span className="text-red-500 text-xs mt-1 block">{errors[0]?.message}</span>}
      </div>
    )
  }

  const handleForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit()
  }

  const handleNewUser = async () => {
    const { data, status, error } = await supabaseClient
      .from("users")
      .insert([{ name: userName, email: userEmail, password: userPassword }])
      .select()
    console.log(data, status)
    if (error) return console.log(error)
  }

  return (
    <form onSubmit={handleForm} className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-brand-primary mb-6 text-center">Register</h1>

      <Field name="name">{field => <TextField field={field} type="text" placeholder="name" />}</Field>
      <Field name="email">{field => <TextField field={field} type="email" placeholder="email" />}</Field>
      <Field name="password">{field => <TextField field={field} type="password" placeholder="password" />}</Field>
      <Field name="confirmPassword">
        {field => <TextField field={field} type="password" placeholder="confirm password" />}
      </Field>

      <button onClick={handleNewUser} className={buttonStyle}>
        Create account
      </button>

      <p className="text-center text-sm text-gray-400 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-brand-accent hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  )
}

export { Register }

// implementar tanstack form + zod
// verificar se senha eh igual
// implementar bcrypt + JWT
