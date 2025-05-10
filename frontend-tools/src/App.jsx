import {Routes, Route} from 'react-router-dom';
import EWTCALCULATOR from './components/EWTCALCULATOR';

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/ewt' element={<EWTCALCULATOR/>}/>
      </Routes>
    </div>
  )
}