import * as React from "react";

import { useHistory } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CustomMenu from "./CustomMenu";



interface IProps {
  login?: string,
  credit?: number,
  fullName?: string,
  canteen: string,
  languageID: number,
  date: string,
  onCanteenChange: (e:any)=> void,
  onDateChange: (d: string)=>void;
}


const Page: React.FC<IProps> = ({ login, credit, fullName, canteen, onCanteenChange, languageID, onDateChange, date}) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const history = useHistory()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenuOpen(true)}>
          <MenuIcon />
        </IconButton>
        {login&&
          <>
            <Typography>
              {`${login.toLocaleUpperCase()}`}
            </Typography>
            <div style={{ marginLeft: 'auto',textAlign: 'center' }}>
              <Typography onClick={()=>history.push("/")}>
                {canteen}
              </Typography>
              <Typography variant='body2'>
                {`${credit} Kč`}
              </Typography>
            </div>
          </>
        }
        <Button 
          style={{marginLeft: 'auto'}}
          color="inherit"
          onClick={() => {
            if(!login){
              history.push("/login")
            }
            else{
              localStorage.removeItem("login");
              localStorage.removeItem("fullName");
              localStorage.removeItem("session");
              localStorage.removeItem("bl");
              localStorage.removeItem("balance"); //TODO move this to redux store
              history.push("/")
            }
          }}
        >
          {login ? "Log out" : "Login"}
        </Button>
      </Toolbar>
      <CustomMenu fullName={fullName} languageID={languageID} open={menuOpen} onClose={() => setMenuOpen(false)} onCanteenChange={onCanteenChange} onDateChange={onDateChange} canteen={canteen} logged={Boolean(login)} />
    </AppBar>
  );
};

export default Page;
