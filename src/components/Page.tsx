import * as React from "react";

import { useHistory } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Typography, Button, styled } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CustomMenu from "./CustomMenu";

const ToolbarItem1 = styled("div")({
  width: "100%",
  display: "flex",
  alignItems: "center"
});
const ToolbarITem2 = styled("div")({
  textAlign: "center",
  width: "100%"
})
const ToolbarITem3 = styled("div")({
  width: '100%',
  textAlign: 'right'
})

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
        <ToolbarItem1>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
          {login &&
            <Typography>
              {`${login.toLocaleUpperCase()}`}
            </Typography>
          }
        </ToolbarItem1>
        {login &&
          <ToolbarITem2>
              <Typography onClick={()=>history.push("/")}>
              {canteen + " - " + (date.slice(8) + "." + date.slice(5, 7)).replace("0", "")}
              </Typography>
              <Typography variant='body2'>
                {`${credit} Kč`}
              </Typography>
          </ToolbarITem2>
        }
        <ToolbarITem3>
          <Button 
            style={{marginLeft: 'auto'}}
            color="inherit"
            onClick={() => {
              if(!login){
                history.push("/login")
              }
              else{
                document.cookie = 'balance=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'fullName=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                history.push("/")
              }
            }}
          >
            {login ? "Log out" : "Login"}
          </Button>
        </ToolbarITem3>
      </Toolbar>
      <CustomMenu
        fullName={fullName}
        languageID={languageID}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onCanteenChange={onCanteenChange}
        onDateChange={onDateChange}
        canteen={canteen}
        logged={Boolean(login)}
        onRedirect={()=>setMenuOpen(false)}
      />
    </AppBar>
  );
};

export default Page;
