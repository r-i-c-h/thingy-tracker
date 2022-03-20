import { IReturnedData } from "../ts/interfaces"
import { useFirestore } from '../hooks/useFirestore';


import styles from './TransactionList.module.css'

export default function TransactionList({ listData }: { listData: IReturnedData[] }) {
  const { deleteDocument } = useFirestore('transactions');

  return (
    <ul className={styles.transactions}>
      {listData.map((item) => (
        <li key={item.id}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.amount}>${item.amount}</p>
          <button onClick={() => deleteDocument(item.id)}>X</button>
        </li>
      ))}
    </ul>
  )
}