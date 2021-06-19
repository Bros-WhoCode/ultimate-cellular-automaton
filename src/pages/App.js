import '../styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Input from './Input'
import {Home} from './Home';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path='/input'>
            
          </Route>
          <Route exact path='/'>
              <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
