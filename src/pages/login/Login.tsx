import { FormEvent, useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { handleError } from '../../ts/ErrorHandler';
// styles
import styles from './Login.module.css'

export default function Login() {
  const { error, isPending, login } = useLogin();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  return (<>
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <p>Sorry - {handleError(error)}</p>}
    </form>
  </>
  )
}
