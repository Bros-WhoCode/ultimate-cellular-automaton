import '../styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  return (
    
    <div className="app">
      <Router>
        <Switch>
          <Route path="/home">
            
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
