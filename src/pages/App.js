import '../styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Input from './Input'
import Home from './Home';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/input'>
            <Input/>
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
