import '../styles/App.css';
import { Switch, Route } from 'react-router-dom'
import { Home } from './Home';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path='/'>
            <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
