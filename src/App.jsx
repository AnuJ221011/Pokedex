import './App.css'
import Pokedex from './components/Pokedex/Pokedex';
import CustomRoutes from './routes/CustomRoutes';
import { Link } from 'react-router-dom';

function App() {

  return (
   <div className='outer-pokedex'>
      <CustomRoutes />
   </div>
  )
}

export default App
