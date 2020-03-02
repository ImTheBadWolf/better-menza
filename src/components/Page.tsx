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
  onLogin: ()=>void,
  onLogout: () => void,
  onCanteenChange: (e:any)=> void,
}


const Page: React.FC<IProps> = ({ login, onLogin, onLogout, credit, fullName, canteen, onCanteenChange, languageID}) => {
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

        <Button style={{marginLeft: 'auto'}} color="inherit" onClick={login? onLogout : onLogin}>{login ? "Log out" : "Login"}</Button>
      </Toolbar>
      <CustomMenu languageID={languageID} open={menuOpen} onClose={() => setMenuOpen(false)} onCanteenChange={onCanteenChange} canteen={canteen} />
    </AppBar>
  );
};

export default Page;
