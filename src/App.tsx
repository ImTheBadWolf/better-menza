import React from 'react';

import FoodList from './components/FoodList';
import LoginForm from './components/LoginForm'
import Page from './components/Page';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import AllergensList from './components/AllergensList';
import Orders from './components/Orders';
import MealExchange from './components/MealExchange';
import Settings from './components/Settings';
import moment from 'moment';

interface IProps extends RouteProps {
  logged: boolean;
  path: string;
}

const PrivateRoute: React.FC<IProps> = ({ path, logged, children, ...rest }) => {
  return logged? 
  (
    <Route {...rest}>
      {children}
    </Route>
  ) : <Redirect to={"/login"}/>
}
const getCookie = (name: string) => { //move to functions file
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts?.pop()?.split(";")?.shift();
}

function App() {

  const [login, setLogin] = React.useState<string | undefined>(getCookie("login") || undefined);
  const [fullName, setFullName] = React.useState<string | undefined>(getCookie("fullName") ||undefined);
  const [canteen, setCanteen] = React.useState<string>(localStorage.getItem('canteen')?.toString() || "Snack Bar");
  const [languageID, setLanguageID] = React.useState<number>(parseInt(localStorage.getItem('languageID') || "0"));
  const [balance, setBalance] = React.useState<number>(0);
  const [date, setDate] = React.useState<string>(moment().format('YYYY-MM-DD'));
 
  const checkLogin = ()=>{
    if (getCookie("login")){
      setLogin(getCookie("login"))
      setFullName(getCookie("fullName"))
      setBalance(parseFloat(getCookie("balance") || "0"))
    }
    else{
      setLogin(undefined);
      setBalance(0);
      setFullName(undefined);
    }
  }

  setInterval(() => checkLogin(), 200);



  return (
    <Router>
      <div>
        <Page
          login={login}
          fullName={fullName}
          credit={balance}
          canteen={canteen}
          date={date}
          languageID={languageID}
          onCanteenChange={(e) => {setCanteen(e); localStorage.setItem("canteen", e)}}
          onDateChange={(d)=>setDate(d)}
        />
        <div style={{ marginBottom: '30px' }}></div>

        <Switch>
          <Route exact path="/login">
            <LoginForm logged={!!login}/>
          </Route>
          <PrivateRoute logged={Boolean(login)} exact path="/">
            <FoodList languageID={languageID} canteen={canteen} date={date}/>
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
          <PrivateRoute logged={Boolean(login)} exact path="/settings">
            <Settings languageID={languageID} onChange={(lang) => {localStorage.setItem('languageID', lang); setLanguageID(lang)}} />
          </PrivateRoute>
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
