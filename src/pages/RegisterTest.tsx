import { useForm } from "@tanstack/react-form"
import * as z from "zod"

// Schema de validacao
const userSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.email("Please enter a valid email").trim().toLowerCase(),
    password: z.string().trim().min(8, "Password must be at least 8 characters").max(20),
    confirmPassword: z.string().trim().min(8, "Confirm password must be at least 8 characters").max(20),
  })
  .required()
  .strict()
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type User = z.infer<typeof userSchema>

const inputStyle =
  "w-full mb-3 px-4 py-2 rounded-xl border border-brand-primary-muted focus:outline-none focus:ring-2 focus:ring-brand-primary-light"
const buttonStyle =
  "w-full bg-brand-primary-light hover:bg-brand-primary text-white py-2 rounded-xl transition cursor-pointer"
const inputErrorStyle = "border-red-400 focus:ring-red-300"
const inputSelectedStyle = "border-brand-primary-muted focus:ring-brand-primary-light"

const RegisterTest = () => {
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as User,
    validators: {
      onBlur: userSchema,
      onSubmit: userSchema,
    },

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
        {hasError && <p className="text-red-500 text-xs mt-1">{errors[0]?.message}</p>}
      </div>
    )
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-10">
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

      <p className="text-center text-xs text-gray-400 mt-4">
        As validacoes rodam no blur e no submit via TanStack + Zod.
      </p>
    </form>
  )
}

export { RegisterTest }
