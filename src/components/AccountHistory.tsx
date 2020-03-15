import * as React from "react";
import axios from 'axios';

import MaterialTable, { MTableToolbar }  from 'material-table';
import MomentUtils from '@date-io/moment';
import translations from "../translations.json";
import { getCookie, deleteCookie } from "../utils";
import config from '../config.json'
import mockData from '../mockData.json'
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Typography, CircularProgress } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";


const AccountHistory: React.FC<{ languageID: number }> = ({ languageID}) => {

	const [dateFrom, setDateFrom] = React.useState<string | null>(moment().subtract(1, 'M').format('YYYY-MM-DD'));
	const [dateTo, setDateTo] = React.useState<string | null>(moment().format('YYYY-MM-DD'));
  const [history, setHistory] = React.useState<any>();
  const {push} = useHistory()


  React.useMemo(() => {
		setHistory("loading")
		if (getCookie("login")==="KKT420"){
			setHistory(mockData.accountHistory);
			return;
		}
    const payload = {
      'command': 'history',
			'dateTo': dateTo,
			'dateFrom': dateFrom,
      'session': getCookie("sessionToken"),
      'lang': translations.languages.keys[languageID]
    }
    axios.post(config.backend, payload)
      .then((res: any) => {
        if (res.data["error"] === "Invalid session") {
          deleteCookie("login")
          deleteCookie("fullName")
          deleteCookie("sessionToken")
          deleteCookie("balance")
          push("/login")
        }
        else
          setHistory(res.data);
      })
      .catch((error: any) => {
        console.log(error);
        setHistory({"error":"Can't load history"});
      })
  }, [push, languageID, dateTo, dateFrom]);
//TODO add loading spinner while getting data from BE
  return (
    <>
      {
        (history === "loading") ?
          (<div style={{ width: '100%', textAlign: 'center' }} ><CircularProgress /></div>)    
        :(
          (history  && !history["error"]) ?
          (
            <MaterialTable
              title={translations.leftMenu.history[languageID]}
              columns={[
                { 
                  title: translations.leftMenu.date[languageID],
                  field: 'date',
                },
                { 
                  title: translations.submodules.table.meal[languageID],
                  field: 'action',
                },
                { 
                  title: translations.submodules.table.reserve[languageID],
                  field: 'deposit'
                },
                {
                  title: translations.submodules.table.account[languageID],
                  field: 'account'
                },
              ]}
							data={history}
              options={{
                search: false,
                paging: false,
                sorting: false,
                draggable:false,
                headerStyle: {
                  backgroundColor: '#3f51b5',
                  color: '#FFF'
                }
              }}
              style={{
                margin: 'auto',
                maxWidth: 1500,
                padding: '5px',
                marginBottom: '30px'
              }}
              components={{
                Toolbar: props => (
									<div style={{
										display: 'flex',
										flexWrap: 'nowrap',
										justifyContent: 'space-between'
									}}>
										<div style={{width: "35%"}}>
											<MTableToolbar {...props} />
										</div>
										<div style={{ width: "100%", textAlign: 'right' }}>
											<MuiPickersUtilsProvider utils={MomentUtils}>
												<DatePicker
													margin="normal"
													label={translations.leftMenu.date[languageID] + " " + translations.leftMenu.from[languageID]}
													format="DD/MM/YYYY"
													disableFuture
													autoOk
													maxDate={dateTo}
													value={dateFrom}//value
													onChange={moment => setDateFrom(moment?.format('YYYY-MM-DD') || null)}
												/>
												<DatePicker
													margin="normal"
													label={translations.leftMenu.date[languageID] + " " + translations.leftMenu.to[languageID]}
													format="DD/MM/YYYY"
													disableFuture
													autoOk
													minDate={dateFrom}
													value={dateTo}
													onChange={moment => setDateTo(moment?.format('YYYY-MM-DD') || null)}
												/>
											</MuiPickersUtilsProvider>
                    </div>
                  </div>
                ),
              }}
            />
          ):
          (<Typography style={{ textAlign: 'center', fontSize: '20px' }}>No data</Typography>)
        )
      }
    </>
  );
};

export default AccountHistory;
