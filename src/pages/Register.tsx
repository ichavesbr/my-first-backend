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

const nameSchema = z.string().trim().min(3, "Name must be at least 3 characters")
const emailSchema = z.email("Please enter a valid email")
const passwordSchema = z.string().trim().min(8, "Password must be at least 8 characters").max(20)
const confirmPasswordSchema = z.string().trim().min(8, "Confirm password must be at least 8 characters").max(20)

const validate = (schema: z.ZodType, value: string) => {
  const result = schema.safeParse(value)
  return result.success ? undefined : result.error.issues[0]?.message
}

type ConfirmPasswordParams = {
  value: string
  fieldApi: { form: { getFieldValue: (name: "password") => string } }
}

const validateName = ({ value }: { value: string }) => validate(nameSchema, value)
const validateEmail = ({ value }: { value: string }) => validate(emailSchema, value)
const validatePassword = ({ value }: { value: string }) => validate(passwordSchema, value)
const validateConfirmPassword = ({ value, fieldApi }: ConfirmPasswordParams) => {
  const error = validate(confirmPasswordSchema, value)
  if (error) return error
  if (value !== fieldApi.form.getFieldValue("password")) return "Passwords don't match"
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

      <Field name="name" validators={{ onBlur: validateName, onSubmit: validateName }}>
        {field => <TextField field={field} type="text" placeholder="name" />}
      </Field>
      <Field name="email" validators={{ onBlur: validateEmail, onSubmit: validateEmail }}>
        {field => <TextField field={field} type="email" placeholder="e-mail" />}
      </Field>
      <Field name="password" validators={{ onBlur: validatePassword, onSubmit: validatePassword }}>
        {field => <TextField field={field} type="password" placeholder="password" />}
      </Field>
      <Field name="confirmPassword" validators={{ onBlur: validateConfirmPassword, onSubmit: validateConfirmPassword }}>
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
