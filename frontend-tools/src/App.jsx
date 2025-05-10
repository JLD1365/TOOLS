import EWTCALCULATOR from './components/EWTCALCULATOR';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="">
      <Link to="/ewt">{<EWTCALCULATOR />}</Link>
    </div>
  )
}