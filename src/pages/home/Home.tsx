import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

import styles from './Home.module.css'

import TransactionForm from '../../components/TransactionForm'
import TransactionList from '../../components/TransactionList'

export default function Home() {
  const { user } = useAuthContext()
  let ID = user!.uid; // If there isn't a user, we couldn't be at the Home page.
  const { documents, error } = useCollection('transactions', ['uid', '==', ID]); // array is for 'where' clause
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p className={styles.error}>Problem with Request:<br /> {error}</p>}
        {documents && <TransactionList listData={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={ID} />
      </div>
    </div>
  )
}