import * as React from "react";

import { useHistory } from "react-router-dom";

import { Drawer, List, ListItem, Select, MenuItem, Divider, InputLabel, FormControl } from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/cs';


import CreditCardIcon from '@material-ui/icons/CreditCard';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import HistoryIcon from '@material-ui/icons/History';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SettingsIcon from '@material-ui/icons/Settings';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FastfoodIcon from '@material-ui/icons/Fastfood';


moment.locale('cs');



interface IProps {
  open: boolean;
  canteen: string;
  onClose: ()=>void;
  onCanteenChange: (e:any)=>void;
}


const CustomMenu: React.FC<IProps> = ({open, onClose, onCanteenChange, canteen}) => {
  const [date, setDate] = React.useState<string | null>(new Date(Date.now()).toISOString())
  const { push } = useHistory();

  return (
    <Drawer open={open} onClose={onClose}>
      <List>

        <ListItem button onClick={() => push('/')} >
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText primary={"Jídelníček"} />
        </ListItem>

        <ListItem button onClick={() => push('/orders')} >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Objednavky"} />
        </ListItem>

        <ListItem button onClick={() => push('/exchange')} >
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary={"Burza"} />
        </ListItem>

        <ListItem button onClick={() => push('/history')} >
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary={"Historia uctu"} />
        </ListItem>

        <ListItem button onClick={() => push('/allergens')} >
          <ListItemIcon>
            <ThumbDownIcon />
          </ListItemIcon>
          <ListItemText primary={"Zoznam alergenov"} />
        </ListItem>

        <ListItem button onClick={() => window.open("https://eps.vsb.cz/")}>
          <ListItemIcon>
            <CreditCardIcon/>
          </ListItemIcon>
          <ListItemText primary={"Vklad na ucet"} />
        </ListItem>

        <ListItem button onClick={() => push('/settings')} >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"Nastavenia"} />
        </ListItem>

        {useHistory().location.pathname === "/" &&
          <>
            <Divider style={{ margin: '30px 16px' }} />
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
                shouldDisableDate={(date) => date?.day() === 0 || date?.day() === 6}
                onChange={moment => setDate(moment?.format() || null)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>
                {'Vydajna'}
              </InputLabel>
              <Select
                label={"Vydajna"}
                value={canteen}
                onChange={(e) => onCanteenChange(e.target.value)}
                fullWidth
              >
                <MenuItem value={"Snack Bar"}>Snack Bar</MenuItem>
                <MenuItem value={"Menza 5"}>Menza 5</MenuItem>
                <MenuItem value={"Kruhovka"}>Kruhovka</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </>
      }
        
      </List>
    </Drawer>
  );
};

export default CustomMenu;
