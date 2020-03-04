import * as React from "react";

import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CustomMenu from "./CustomMenu";



interface IProps {
  login?: string,
  credit?: number,
  fullName?: string,
  canteen: string,
  languageID: number,
  onCanteenChange: (e:any)=> void,
  onLogin: (type:string)=>void;
}


const Page: React.FC<IProps> = ({ login, credit, fullName, onLogin, canteen, onCanteenChange, languageID}) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenuOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Typography>
          {login && `${login}`}
        </Typography>

        {login && <div style={{ marginLeft: 'auto',textAlign: 'center' }}>
          <Typography>
            {canteen}
          </Typography>
          <Typography variant='body2'>
            {`${credit} Kč`}
          </Typography>
        </div>}

        <Button 
          style={{marginLeft: 'auto'}}
          color="inherit"
          onClick={() => login? onLogin("logout") : onLogin("login")}
        >
          {login ? "Log out" : "Login"}
        </Button>
      </Toolbar>
      <CustomMenu fullName={fullName} languageID={languageID} open={menuOpen} onClose={() => setMenuOpen(false)} onCanteenChange={onCanteenChange} canteen={canteen} logged={Boolean(login)} />
    </AppBar>
  );
};

export default Page;
