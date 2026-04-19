import { useForm } from "@tanstack/react-form"
import { Link } from "react-router-dom"
import * as z from "zod"

const inputStyle =
  "w-full mb-3 px-4 py-2 rounded-xl border border-brand-primary-muted focus:outline-none focus:ring-2 focus:ring-brand-primary-light"
const buttonStyle =
  "w-full bg-brand-primary-light hover:bg-brand-primary text-white py-2 rounded-xl transition cursor-pointer"
const inputErrorStyle = "border-red-400 focus:ring-red-300"
const inputSelectedStyle = "border-brand-primary-muted focus:ring-brand-primary-light"

// Schema de validacao do form
const formSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.email("Please enter a valid email").trim().toLowerCase(),
    password: z.string().trim().min(8, "Password must be at least 8 characters").max(20),
    confirmPassword: z.string().trim().min(8, "Confirm password must be at least 8 characters").max(20),
  })
  .required()
  .strict() // evita que outras propriedades sejam enviadas, nada alem de name, email, password e confirmPassword
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type User = z.infer<typeof formSchema>

const RegisterTest = () => {
  // Tanstack Form configuration
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" } as User,
    validators: { onBlur: formSchema, onSubmit: formSchema }, // onBlur validacao quando clica fora do input
    onSubmit: async ({ value }) => console.log("Validated user:", value),
  })

  type FieldProps<T extends string | number> = {
    state: {
      value: T
      meta: {
        errors: ({ message: string } | undefined)[]
        isTouched: boolean
      }
    }
    handleChange: (value: T) => void
    handleBlur: () => void
  }

  type TextFieldProps = {
    field: FieldProps<string>
    type: string
    placeholder: string
  }

  // Component created for input with tanstack validation
  const TextField = ({ field, type, placeholder }: TextFieldProps) => {
    const { errors, isTouched } = field.state.meta
    const hasError = errors.length > 0 && isTouched

    return (
      <div className="mb-4">
        <input
          type={type}
          value={field.state.value}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
          className={`${inputStyle} ${hasError ? inputErrorStyle : inputSelectedStyle}`}
        />
        {hasError && <p className="text-red-500 text-xs">{errors[0]?.message}</p>}
      </div>
    )
  }

  return (
    <form onSubmit={e => (e.preventDefault(), handleSubmit())} className="bg-white p-10">
      <h1 className="text-2xl font-semibold text-brand-primary mb-6 text-center">Register</h1>

      <Field name="name">{field => <TextField field={field} type="text" placeholder="name" />}</Field>
      <Field name="email">{field => <TextField field={field} type="email" placeholder="e-mail" />}</Field>
      <Field name="password">{field => <TextField field={field} type="password" placeholder="password" />}</Field>
      <Field name="confirmPassword">
        {field => <TextField field={field} type="password" placeholder="confirm password" />}
      </Field>

      {/* desabilita botao enquanto o form esta enviando */}
      <Subscribe selector={state => [state.isSubmitting]}>
        {([isSubmitting]) => (
          <button disabled={isSubmitting} className={buttonStyle}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        )}
      </Subscribe>

      <p className="text-center text-sm text-gray-400 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-brand-accent hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  )
}

export { RegisterTest }
