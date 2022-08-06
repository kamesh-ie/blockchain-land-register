import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Landregister from './Landregister';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import { Maps } from './Land_register_system/components/maps';

const links = (
  <div>
      <Link to={'/app'}>app</Link><br />
      <Link to={'/land'}>land</Link><br />
      <Link to={'/maps'}>maps</Link>
  </div>
)

ReactDOM.render(
  <React.StrictMode>
   <Router>
   <Routes>
      <Route path='/app' element={<App />} />
      <Route path='/land/*' element={<Landregister />} />
      <Route path='/maps' element={<Maps />} />
      <Route path='/' element={<h1>home page {links}</h1>} />
    </Routes>
   </Router>
  </React.StrictMode>,
  document.getElementById('root')
);