import { useAuth } from '@features/Auth/hooks/useAuth'
import { useToast } from '@shared/hooks/useToast'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

interface FormState {
  email: string
  password: string
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  const { isLoading, error, login } = useAuth()
  const { showError } = useToast()

  const [formData, setFormData] = useState<FormState>({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (error) {
      showError(error)
    }
  }, [error, showError])

  const updateFormField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const ok = await login(email, password)
    if (ok) {
      navigate('/')
    }
  }

  return (
    <div className="my-20 flex justify-center">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box h-fit w-xs border p-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="fieldset">
          <label
            htmlFor="email"
            className="label"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="input"
            placeholder="Email"
            required
            value={formData.email}
            onChange={updateFormField}
          />
          <span
            className="hint text-red-500"
            id="email-hint"
          ></span>
        </fieldset>

        <fieldset className="fieldset">
          <label
            htmlFor="password"
            className="label"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="input"
            placeholder="Password"
            minLength={6}
            required
            value={formData.password}
            onChange={updateFormField}
          />
        </fieldset>

        <button
          className="btn btn-primary mt-4"
          type="submit"
          disabled={isLoading ? true : false}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
        <button
          type="button"
          className="btn btn-ghost mt-1"
          onClick={() => navigate('/products')}
        >
          Back
        </button>
      </form>
    </div>
  )
}
