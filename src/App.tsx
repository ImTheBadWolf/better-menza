import React from 'react';
import axios from 'axios';

import FoodList from './components/FoodList';
import Page from './components/Page';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import AllergensList from './components/AllergensList';
import Orders from './components/Orders';
import MealExchange from './components/MealExchange';
import Settings from './components/Settings';

interface IProps extends RouteProps {
  logged: boolean;
}

const PrivateRoute: React.FC<IProps> = ({ path, logged, children, ...rest }) => {
  return logged? 
  (
    <Route {...rest}>
      {children}
    </Route>
  ) : <Redirect to={"/"}/>
}

function App() {

  const [login, setLogin] = React.useState<string>();
  const [fullName, setFullName] = React.useState<string>();
  const [canteen, setCanteen] = React.useState<string>("Snack Bar");
  const [languageID, setLanguageID] = React.useState<number>(parseInt(localStorage.getItem('languageID') || "0"));
 
  const getData = (type: string) => {
    let payload;
    
    if(type==="login"){
      payload = {'command': 'login'}
    }
    else if(type==="logout"){
      localStorage.setItem("logged", "false");
      setLogin(undefined);
      setFullName(undefined);
    }
    else if(type==="meals"){
      payload = {'command': 'meals', 'canteen': canteen}
    }
    axios.post("http://127.0.0.1:5000/backend", payload)
      .then((res: any) => {
        if(res.data["login_data"]){
          setLogin(res.data["login_data"].login);
          setFullName(res.data["login_data"].firstName + " " + res.data["login_data"].lastName)
          localStorage.setItem("logged", "true")
        }
      })
  }

  //setInterval(() => checkLogin(), 200);//https://stravovani.vsb.cz/WebKredit/PrihlasenyUzivatel.aspx



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
          onLogin={(type:string) => getData(type)}
        />
        <div style={{ marginBottom: '30px' }}></div>

        <Switch>
          <Route logged={Boolean(login)} exact path="/">
            <FoodList languageID={languageID}/>
          </Route>
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
