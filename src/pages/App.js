import '../styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {CA} from './Home';
import {Sudoku} from './Sudoku';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          {/* <Route path='/input'>
            
          </Route> */}
          <Route exact path='/'>
              <CA/>
              <Sudoku/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
