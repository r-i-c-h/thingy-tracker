import TransactionForm from '../../components/TransactionForm'
import { useAuthContext } from '../../hooks/useAuthContext'

import styles from './Home.module.css'

function Home() {
  const { user } = useAuthContext()
  let ID = user!.uid; // If there isn't a user, we couldn't be at the Home page.

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        List of Thingz:
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={ID} />
      </div>
    </div>
  )
}

export default Home
