import '../styles/App.css';
import { Switch, Route } from 'react-router-dom'
import { Home } from './Home';
import {Sudoku} from './Sudoku';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path='/'>
            <div className="app-container">
              <Home/>
              <Sudoku/>
            </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
