import Login from './pages/Login';
import './styles/reset.css'
import './styles/base.css'

import Router from "./router";
import userService from './services/userService';

function App() {
  userService.validateAth()
  return (
    <div className="App" style={{height: "100%"}}>
      <Router></Router>
    </div>
  );
}

export default App;
