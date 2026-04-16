import { useForm } from "@tanstack/react-form"
import { Link } from "react-router-dom"
import z from "zod"

type FieldProps<T extends string | number> = {
  state: { value: T; meta: { errors: ({ message: string } | undefined)[]; isTouched: boolean } }
  handleChange: (value: T) => void
  handleBlur: () => void
}

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const LoginForm = () => {
  const { Field, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => console.log(value),
    validators: { onSubmit: formSchema, onBlur: formSchema },
  })

  const formSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit()
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
          className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${
            hasError ? "border-red-400 focus:ring-red-300" : "border-brand-primary-muted focus:ring-brand-primary-light"
          }`}
        />
        {hasError && <span className="text-red-500 text-xs mt-1 block">{errors[0]?.message}</span>}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-brand-primary mb-6 text-center">Login</h1>
      <form onSubmit={formSubmit}>
        <Field name="email">{field => <TextField field={field} type="email" placeholder="Email" />}</Field>
        <Field name="password">{field => <TextField field={field} type="password" placeholder="Password" />}</Field>
        <button
          type="submit"
          className="w-full bg-brand-primary-light hover:bg-brand-primary text-white py-2 rounded-xl transition cursor-pointer">
          Sign In
        </button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-brand-accent hover:underline">
          Register
        </Link>
      </p>
    </div>
  )
}

export { LoginForm }
