import React from 'react';
import './App.css';
import './css/style.css';
import Chat from './views/chat';
import Join from './views/join'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
function App() {
  return (
    <div>
      <BrowserRouter>
      <div>
        <Switch>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/">
            <Join />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>         
    </div>
  );
}

export default App;
