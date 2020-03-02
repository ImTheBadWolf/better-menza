import React from 'react';

import FoodList from './components/FoodList';
import Page from './components/Page';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllergensList from './components/AllergensList';
import Orders from './components/Orders';
import MealExchange from './components/MealExchange';
import Settings from './components/Settings';

function App() {

  const [login, setLogin] = React.useState<string>();
  const [fullName, setFullName] = React.useState<string>();
  const [canteen, setCanteen] = React.useState<string>("Snack Bar");

  const [languageID, setLanguageID] = React.useState<number>(parseInt(localStorage.getItem('languageID') || "0"));
  /* TODO move states to header, they are not needed here */

  return (
    <Router>
      <div>
        <Page
          login={login}
          fullName={fullName}
          credit={169.42}
          canteen={canteen}
          languageID={languageID}
          onCanteenChange={(e) => setCanteen(e)}
          onLogin={() => { setLogin("KKT0420"); setFullName("Pišta Gadžino") }}
          onLogout={() => { setLogin(undefined); setFullName(undefined) }}
        />
        <div style={{ marginBottom: '30px' }}></div>

        <Switch>
          <Route exact path="/">
            <FoodList languageID={languageID}/>
          </Route>
          <Route exact path="/allergens">
            <AllergensList languageID={languageID}/>
          </Route>
          <Route exact path="/history">
            <div>account history goes here</div>
          </Route>
          <Route exact path="/exchange">
            <MealExchange languageID={languageID}/>
          </Route>
          <Route exact path="/orders">
            <Orders languageID={languageID}/>
          </Route>
          <Route exact path="/settings">
            <Settings languageID={languageID} onChange={(lang) => {localStorage.setItem('languageID', lang); setLanguageID(lang)}} />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
