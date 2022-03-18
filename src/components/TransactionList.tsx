import { IReturnedData } from "../ts/interfaces"

import styles from './TransactionList.module.css'

export default function TransactionList({ listData }: { listData: IReturnedData[] }) {
  return (
    <ul className={styles.transactions}>
      {listData.map((item) => (
        <li key={item.id}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.amount}>${item.amount}</p>
        </li>
      ))}
    </ul>
  )
}