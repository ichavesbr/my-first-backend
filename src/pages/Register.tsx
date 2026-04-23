import * as z from "zod"
import { Link } from "react-router-dom"
import { useForm } from "@tanstack/react-form"
import { ErrorMessage } from "../components/ErrorMessage"
import { supabaseClient } from "../lib/supabaseClient"
import { buttonStyle, formStyle, inputErrorStyle, inputSelectedStyle, inputStyle } from "../utils/styles"

type User = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type TextFieldField = {
  state: {
    value: unknown
    meta: {
      errors: (string | undefined)[]
      isTouched: boolean
    }
  }
  handleChange: (value: string) => void
  handleBlur: () => void
}

type TextFieldProps = {
  field: TextFieldField
  type: string
  placeholder: string
}

const TextField = ({ field, type, placeholder }: TextFieldProps) => {
  // field.state.meta -> contains functions related to "input fields"
  const { errors, isTouched } = field.state.meta

  // isTouched -> means input field has focus on it, selected (user is typing)
  const hasError = errors.length > 0 && isTouched

  return (
    <div className="mb-4">
      <input
        type={type}
        value={field.state.value as string}
        placeholder={placeholder}
        onBlur={field.handleBlur} // onBlur -> means when input loses focus (user click outside of input)
        onChange={e => field.handleChange(e.target.value)}
        className={`${inputStyle} ${hasError ? inputErrorStyle : inputSelectedStyle}`}
      />
      {hasError && <ErrorMessage message={errors[0]} />}
    </div>
  )
}

const Register = () => {
  // Tanstack Form configuration
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" } as User,
    onSubmit: ({ value }) => handleSupabaseAuth({ value }),
  })

  // Send user's data to supabase DB
  const handleSupabaseAuth = async ({ value }: { value: User }) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email: value.email,
      password: value.password,
      options: {
        data: { name: value.name },
      },
    })

    console.log("data do supabase function: ", data)

    if (error) throw new Error(error.message)
    return data
  }

  return (
    <form onSubmit={e => (e.preventDefault(), handleSubmit())} className={formStyle}>
      <h1 className="text-2xl font-semibold text-brand-primary mb-6 text-center">Register</h1>

      <Field
        name="name"
        validators={{
          onBlur: ({ value }) => {
            const r = z.string().trim().min(3, "Name must be at least 3 characters").safeParse(value)
            return r.success ? undefined : r.error.issues[0]?.message
          },
          onSubmit: ({ value }) => {
            const r = z.string().trim().min(3, "Name must be at least 3 characters").safeParse(value)
            return r.success ? undefined : r.error.issues[0]?.message
          },
        }}>
        {field => <TextField field={field} type="text" placeholder="name" />}
      </Field>
      <Field
        name="email"
        validators={{
          onBlur: ({ value }) => {
            const r = z.email("Please enter a valid email").safeParse(value)
            return r.success ? undefined : r.error.issues[0]?.message
          },
          onSubmit: ({ value }) => {
            const r = z.email("Please enter a valid email").safeParse(value)
            return r.success ? undefined : r.error.issues[0]?.message
          },
        }}>
        {field => <TextField field={field} type="email" placeholder="e-mail" />}
      </Field>
      <Field
        name="password"
        validators={{
          onBlur: ({ value }) => {
            const r = z.string().trim().min(8, "Password must be at least 8 characters").max(20).safeParse(value)
            return r.success ? undefined : r.error.issues[0]?.message
          },
          onSubmit: ({ value }) => {
            const r = z.string().trim().min(8, "Password must be at least 8 characters").max(20).safeParse(value)
            return r.success ? undefined : r.error.issues[0]?.message
          },
        }}>
        {field => <TextField field={field} type="password" placeholder="password" />}
      </Field>
      <Field
        name="confirmPassword"
        validators={{
          onBlur: ({ value, fieldApi }) => {
            const r = z
              .string()
              .trim()
              .min(8, "Confirm password must be at least 8 characters")
              .max(20)
              .safeParse(value)
            if (!r.success) return r.error.issues[0]?.message
            if (value !== fieldApi.form.getFieldValue("password")) return "Passwords don't match"
          },
          onSubmit: ({ value, fieldApi }) => {
            const r = z
              .string()
              .trim()
              .min(8, "Confirm password must be at least 8 characters")
              .max(20)
              .safeParse(value)
            if (!r.success) return r.error.issues[0]?.message
            if (value !== fieldApi.form.getFieldValue("password")) return "Passwords don't match"
          },
        }}>
        {field => <TextField field={field} type="password" placeholder="confirm password" />}
      </Field>

      {/* Disable button while submiting form */}
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

export { Register }

// usar bcrypt em algum lugar
// limpar form apos enviar
// redirecionar para pagina protegida
// aviso de que se cadastrou com sucesso
// verificar se ja nao tem outro usuario cadastrado
// apos redirecionado/logado trocar o "login" da navbar pelo nome do user
// se o user tentar acessar /login ou /register mandar de volta para pagina inicial
