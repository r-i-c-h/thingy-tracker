
import { useState } from 'react';
import styles from './TransactionForm.module.css'

export default function TransactionForm() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('')

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.log(({
      name,
      amount
    }));


  }
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
            min="0"
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>Add Thingy</button>
      </form>
    </>
  )

}