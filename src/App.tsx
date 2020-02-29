import React from 'react';

import FoodList from './components/FoodList';
import Header from './components/Header';

function App() {

  const [login, setLogin] = React.useState<string>();
  const [fullName, setFullName] = React.useState<string>();
  const [credit, setCredit] = React.useState<number>(169.42);
  const [canteen, setCanteen] = React.useState<string>("Snack Bar");

  return (
    <>
      <Header
        login={login}
        fullName={fullName}
        credit={credit}
        canteen={canteen}
        onCanteenChange={(e)=>setCanteen(e)}
        onCreditUp={()=>setCredit(credit+1)}
        onLogin={() => { setLogin("KKT0420"); setFullName("Pišta Gadžino") }}
        onLogout={() => { setLogin(undefined); setFullName(undefined)}}
        />
      <div style={{marginBottom: '30px'}}></div>
      <FoodList/>
    </>
  );
}

export default App;
