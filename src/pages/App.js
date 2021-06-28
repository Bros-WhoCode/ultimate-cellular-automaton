import '../styles/App.css';
import { Switch, Route } from 'react-router-dom'
import { Home } from './Home';
import { useReducer } from 'react';
import { getSudokuInitialState, SudokuContext, sudokuReducer } from '../components/Reducers/SudokuReducer';
import { Sudoku } from './Sudoku';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path='/'>
            <div className="app-container">
              <Home/>
              <SudokuContext.Provider value={useReducer(sudokuReducer, getSudokuInitialState())}>
                <Sudoku/>
              </SudokuContext.Provider>
            </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
