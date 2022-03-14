import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import styles from './Navbar.module.css';

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}><Link to="/">Track Thingies</Link></li>
        {!user && (<>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </>)
        }
        {user &&
          <li>
            <button className="btn" onClick={logout}>Logout</button>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Navbar
