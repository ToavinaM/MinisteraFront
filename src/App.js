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
import Taches from './components/Tache/Taches';
import Parametre from './components/Parametre/Parametre';
import MyMap from './components/MyMap/MyMap';
import GestionUser from './components/GestionUser/GestionUser';
import Compte from './components/Compte/Compte';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/map" element={<MyMap />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projets" element={<Projet />} />
          <Route path="/tachesById" element={<Taches />} />
          {/* <Route path="/tachesById/:idProjet" element={<Taches />} /> */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/gestionUser" element={<GestionUser />} />
          <Route path="/parametre" element={<Parametre />} />
          <Route path="/profil" element={<Compte />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
