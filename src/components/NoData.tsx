import * as React from "react";
import { Card, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";


const NoData: React.FC<{ languageID: number, login?: string }> = ({ languageID, login }) => {

  if(login)
    return <Redirect to={"/"}/>

  return (
    <Card style={{ width: '60%', margin: 'auto', textAlign: 'center', padding: 10 }} onClick={() => window.open("https://www.sso.vsb.cz/login")}>
      <Typography>Please log in</Typography>
    </Card>
  );
};

export default NoData;
