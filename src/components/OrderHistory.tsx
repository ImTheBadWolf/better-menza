import * as React from "react";
import axios from 'axios';

import MaterialTable  from 'material-table';

import translations from "../translations.json";
import { getCookie, deleteCookie } from "../utils";
import config from '../config.json'
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Typography } from "@material-ui/core";


const OrderHistory: React.FC<{ languageID: number }> = ({ languageID}) => {

  const [history, setHistory] = React.useState<any>();
  const {push} = useHistory()


  React.useMemo(() => {
    setHistory("loading")
    const payload = {
      'command': 'history',
      'dateTo': moment().format('YYYY-MM-DD'),
      'dateFrom': moment().subtract (1, 'M').format('YYYY-MM-DD'),
      'session': getCookie("sessionToken"),
      'lang': translations.languages.keys[languageID]
    }
    axios.post(config.backend, payload)
      .then((res: any) => {
        if (res.data["error"] === "Invalid session" && getCookie("login") !== "KKT420") {
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
  }, [push, languageID]);
//TODO add loading spinner while getting data from BE
  return (
    <>
      {(history && history !== "loading" && !history["error"]) ?
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
          />
        ):
        (<Typography style={{ textAlign: 'center', fontSize: '20px' }}>No data</Typography>)
      }
    </>
  );
};

export default OrderHistory;
