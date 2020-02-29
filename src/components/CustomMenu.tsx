import * as React from "react";

import { Drawer, List, ListItem, Select, MenuItem, Divider } from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';


import CreditCardIcon from '@material-ui/icons/CreditCard';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import HistoryIcon from '@material-ui/icons/History';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SettingsIcon from '@material-ui/icons/Settings';
import ListAltIcon from '@material-ui/icons/ListAlt';

interface IProps {
  open: boolean;
  canteen: string;
  onClose: ()=>void;
  onCreditUp: ()=>void;
  onCanteenChange: (e:any)=>void;
}


const CustomMenu: React.FC<IProps> = ({open, onClose, onCreditUp, onCanteenChange, canteen}) => {
  const [date, setDate] = React.useState<string | null>(new Date(Date.now()).toISOString())


  return (
    <Drawer open={open} onClose={onClose}>
      <List>

        <ListItem>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Datum"
              format="DD/MM/YYYY"
              disablePast
              autoOk
              value={date}
              onChange={moment => setDate(moment?.format() || null)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
        </MuiPickersUtilsProvider>
        </ListItem>
        <ListItem>
          <Select
            value={canteen}
            onChange={(e)=>onCanteenChange(e.target.value)}
            fullWidth
          >
            <MenuItem value={"Snack Bar"}>Snack Bar</MenuItem>
            <MenuItem value={"Menza 5"}>Menza 5</MenuItem>
            <MenuItem value={"Kruhovka"}>Kruhovka</MenuItem>
          </Select>
        </ListItem>

        <Divider style={{margin: '30px 16px'}} />
            
        <ListItem button >
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary={"Objednavky"} />
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText primary={"Burza"} />
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary={"Historia uctu"} />
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <ThumbDownIcon />
          </ListItemIcon>
          <ListItemText primary={"Zoznam alergenov"} />
        </ListItem>
        <ListItem button onClick={onCreditUp}>
          <ListItemIcon>
            <CreditCardIcon/>
          </ListItemIcon>
          <ListItemText primary={"Vklad na ucet"} />
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"Nastavenia"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default CustomMenu;
