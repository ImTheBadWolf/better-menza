import * as React from "react";

import { useHistory } from "react-router-dom";

import { Drawer, List, ListItem, Select, MenuItem, Divider, InputLabel, FormControl, Typography } from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/cs';
import 'moment/locale/en-gb';

import CreditCardIcon from '@material-ui/icons/CreditCard';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import HistoryIcon from '@material-ui/icons/History';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SettingsIcon from '@material-ui/icons/Settings';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import translations from "../translations.json";


interface IProps {
  open: boolean;
  canteen: string;
  languageID: number,
  fullName?: string,
  onClose: ()=>void;
  onCanteenChange: (e:any)=>void;
  onDateChange: (d: string)=>void;
  logged: boolean,
}


const CustomMenu: React.FC<IProps> = ({ open, onClose, onCanteenChange, canteen, languageID, logged, fullName, onDateChange}) => {
  const [date, setDate] = React.useState<string | null>(new Date(Date.now()).toISOString())
  const { push } = useHistory();
  moment.locale(translations.languages.locales[languageID]);
//todo set drawer width to 20% or so
  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        <Typography style={{ textAlign: 'center', margin: logged ? undefined:'30px'}}>{logged? fullName : "  Please log in  "}</Typography>
        {logged &&
          <>
            <Divider style={{ margin: '5px 16px' }} />
            <ListItem button onClick={() => push('/')} >
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText primary={translations.leftMenu.home[languageID]} />
            </ListItem>

            <ListItem button onClick={() => push('/orders')} >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
              <ListItemText primary={translations.leftMenu.orders[languageID]} />
            </ListItem>

            <ListItem button onClick={() => push('/exchange')} >
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary={translations.leftMenu.mealExchange[languageID]} />
            </ListItem>

            <ListItem button onClick={() => push('/history')} >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={translations.leftMenu.history[languageID]} />
            </ListItem>

            <ListItem button onClick={() => push('/allergens')} >
              <ListItemIcon>
                <ThumbDownIcon />
              </ListItemIcon>
              <ListItemText primary={translations.leftMenu.allergens[languageID]} />
            </ListItem>

            <ListItem button onClick={() => window.open("https://eps.vsb.cz/")}>
              <ListItemIcon>
                <CreditCardIcon/>
              </ListItemIcon>
              <ListItemText primary={translations.leftMenu.payment[languageID]} />
            </ListItem>
            <ListItem button onClick={() => push('/settings')} >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={translations.leftMenu.settings[languageID]} />
            </ListItem>
          </>
        }
        {useHistory().location.pathname === "/" && logged &&
          <>
            <Divider style={{ margin: '30px 16px' }} />
            <ListItem>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label={translations.leftMenu.date[languageID]}
                format="DD/MM/YYYY"
                disablePast
                autoOk
                value={date}
                shouldDisableDate={(date) => date?.day() === 0 || date?.day() === 6}
                onChange={moment => { setDate(moment?.format() || null); onDateChange(moment?.format('YYYY-MM-DD') || "")}}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>
                {translations.leftMenu.canteen[languageID]}
              </InputLabel>
              <Select
                label={translations.leftMenu.canteen[languageID]}
                value={canteen}
                onChange={(e) => onCanteenChange(e.target.value)}
                fullWidth
              >
                <MenuItem value={"Menza 5"}>Menza 5</MenuItem>
                <MenuItem value={"Aula"}>Aula</MenuItem>
                <MenuItem value={"Snack Bar"}>Snack Bar</MenuItem>
                <MenuItem value={"FAST"}>FAST</MenuItem>
                <MenuItem value={"FBI"}>FBI</MenuItem>
                <MenuItem value={"Pizzeria"}>Pizzeria</MenuItem>
                <MenuItem value={"Kruhovka"}>Kruhovka</MenuItem>
                <MenuItem value={"Bufet EkF"}>Bufet EkF</MenuItem>
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
