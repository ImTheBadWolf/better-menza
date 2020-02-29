import React from 'react';

import FoodList from './components/FoodList';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllergensList from './components/AllergensList';
import Orders from './components/Orders';
import MealExchange from './components/MealExchange';

function App() {

  const [login, setLogin] = React.useState<string>();
  const [fullName, setFullName] = React.useState<string>();
  const [canteen, setCanteen] = React.useState<string>("Snack Bar");
  /* TODO move states to header, they are not needed here */

  return (
    <Router>
      <div>
        <Header
          login={login}
          fullName={fullName}
          credit={169.42}
          canteen={canteen}
          onCanteenChange={(e) => setCanteen(e)}
          onLogin={() => { setLogin("KKT0420"); setFullName("Pišta Gadžino") }}
          onLogout={() => { setLogin(undefined); setFullName(undefined) }}
        />
        <div style={{ marginBottom: '30px' }}></div>

        <Switch>
          <Route exact path="/">
            <FoodList/>
          </Route>
          <Route exact path="/allergens">
            <AllergensList/>
          </Route>
          <Route exact path="/history">
            <div>account history goes here</div>
          </Route>
          <Route exact path="/exchange">
            <MealExchange/>
          </Route>
          <Route exact path="/orders">
            <Orders/>
          </Route>
          <Route exact path="/settings">
            <div>settings should be here</div>
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
