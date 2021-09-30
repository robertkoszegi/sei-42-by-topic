import './OrderHistoryPage.css';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import PrevOrdersList from '../../components/PrevOrdersList/PrevOrdersList';

export default function OrderHistoryPage(props) {
    return (
      <main className="OrderHistoryPage">
        <nav>
          <Logo />
          <Link to="/orders/new" className="button btn-sm">NEW ORDER</Link>
          <UserLogOut  />
        </nav>
        <PrevOrdersList />
        <div></div>
    </main>
    )
}