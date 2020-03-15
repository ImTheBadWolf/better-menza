import React from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { Paper, Button, useMediaQuery } from '@material-ui/core';
import config from '../config.json'
 
const LoginForm: React.FC<{logged: boolean}> = ({logged}) => {

  const [login, setLogin] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const history = useHistory()
  const matches = useMediaQuery('(min-width:660px)');

  if(logged)
    history.push("/")

  const loginF = (event: React.FormEvent)=>{
    event.preventDefault();
    let payload = { 'command': 'login', 'login': login, 'password': password };

    axios.post(config.backend, payload)
      .then((res: any) => {
        if (res.data["login_data"]) {
          document.cookie = "login="+login||"";
          document.cookie = "fullName=" + res.data["login_data"].fullName;
          document.cookie = "sessionToken=" + res.data["login_data"].token;
          document.cookie = "balance=" + res.data["login_data"].balance;//move to redux??
          history.push("/")
        }
        else if(res.data["error"]){
          alert(res.data["error"])
        }
      })
      .catch((error: any) => {
        console.log(error);
        alert("Can't login right now, try again later") //TODO redo alerts to snackbars
      })
    
  }

  return (
    <Paper style={{ margin: 'auto', padding: 25, width: matches?'20%':'45%' }}>
      <div style={{ display: 'table'}} >
        <form onSubmit={loginF}>
          <TextField label="Login" variant="outlined" onChange={(e) => setLogin(e.target.value)}
            style={{width: '100%', marginBottom: 7}}
             />
          <TextField label="Password" variant="outlined"
            style={{ width: '100%', marginBottom: 7 }}
            onChange={(e) => setPassword(e.target.value)}
            type='Password'  />
          <Button variant='outlined' style={{ width: '100%'}} type='submit' >Login</Button>
        </form>
      </div>
    </Paper>
  );
}
export default LoginForm;