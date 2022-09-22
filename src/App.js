import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import {huhu} from 'huhu';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Projet from './components/Projet/Projet';
import AddProjet from './components/Projet/AddProjet';
import Test from './components/Test';
import Taches from './components/Tache/Taches';
import Parametre from './components/Parametre/Parametre';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projets" element={<Projet />} />
          <Route path="/tachesById/:idProjet" element={<Taches />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/parametre" element={<Parametre />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
