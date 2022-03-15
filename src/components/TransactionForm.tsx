import { useEffect, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';

import styles from './TransactionForm.module.css'

export default function TransactionForm({ uid }: { uid: string }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('')

  const { addDocument, response } = useFirestore('transactions');

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    addDocument(({ amount, name, uid }));
  }

  useEffect(() => {/* To clear form on submission success */
    if (response.success) {
      setName('')
      setAmount('')
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Thing</h3>
      <form className={styles['thing-form']} onSubmit={handleSubmit}>
        <label>
          <span>Item Name: </span>
          <input type="text"
            required
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Item Value ($): </span>
          <input type="number"
            required
            step="0.01"
            min="0.01"
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>Add Thingy</button>
      </form>
    </>
  )
}