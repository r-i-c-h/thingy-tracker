import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { handleError } from '../../ts/ErrorHandler'

import styles from './Home.module.css'

import TransactionForm from '../../components/TransactionForm'

export default function Home() {
  const { user } = useAuthContext()
  let ID = user!.uid; // If there isn't a user, we couldn't be at the Home page.
  const { documents, error } = useCollection('transactions')


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={ID} />
      </div>
    </div>
  )
}