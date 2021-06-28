import { Switch, Route } from 'react-router-dom'
import { Home } from './Home';

import '../styles/App.css';

const App = () => {
  return (
    <div className="app">
      <div className="app-container">
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
