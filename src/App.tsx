import React from 'react';

import FoodList from './components/FoodList';
import Page from './components/Page';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import AllergensList from './components/AllergensList';
import Orders from './components/Orders';
import MealExchange from './components/MealExchange';
import Settings from './components/Settings';
import NoData from './components/NoData';

interface IProps extends RouteProps {
  logged: boolean;
}

const PrivateRoute: React.FC<IProps> = ({ path, logged, children, ...rest }) => {
  return logged? 
  (
    <Route {...rest}>
      {children}
    </Route>
  ) : <Redirect to={"/login"}/>
}

function App() {

  const [login, setLogin] = React.useState<string>();
  const [fullName, setFullName] = React.useState<string>();
  const [canteen, setCanteen] = React.useState<string>("Snack Bar");
  const [languageID, setLanguageID] = React.useState<number>(parseInt(localStorage.getItem('languageID') || "0"));
 
  const checkLogin = () => {
    if(localStorage.getItem("logged") === "true"){
      setLogin("KKT0420");
      setFullName("Pišta Gadžino")
    }
    else
      setLogin(undefined);
  }

  setInterval(() => checkLogin(), 200);//https://stravovani.vsb.cz/WebKredit/PrihlasenyUzivatel.aspx



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
        />
        <div style={{ marginBottom: '30px' }}></div>

        <Switch>
          <Route exact path="/login">
            <NoData languageID={languageID} login={login} />
          </Route>

          <PrivateRoute logged={Boolean(login)} exact path="/">
            <FoodList languageID={languageID}/>
          </PrivateRoute>
          <PrivateRoute logged={Boolean(login)} exact path="/allergens">
            <AllergensList languageID={languageID}/>
          </PrivateRoute>
          <PrivateRoute logged={Boolean(login)} exact path="/history">
            <div>account history goes here</div>
          </PrivateRoute>
          <PrivateRoute logged={Boolean(login)} exact path="/exchange">
            <MealExchange languageID={languageID}/>
          </PrivateRoute>
          <PrivateRoute logged={Boolean(login)} exact path="/orders">
            <Orders languageID={languageID}/>
          </PrivateRoute>
          <Route exact path="/settings">
            <Settings languageID={languageID} onChange={(lang) => {localStorage.setItem('languageID', lang); setLanguageID(lang)}} />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
