import * as React from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import translations from "../translations.json";


const Settings: React.FC<{ languageID: number, onChange: (e: any) => void }> = ({ languageID, onChange}) => {

  return (
    <div style={{width: '25%', margin: 'auto'}}>
      <FormControl fullWidth>
        <InputLabel>
          {translations.languages.settings[languageID]}
        </InputLabel>
        <Select
          label={"Jazyk"}
          value={translations.languages.keys[languageID]}
          onChange={(lang) => onChange( translations.languages.keys.indexOf( lang.target.value as string ))}
          fullWidth
        >
          <MenuItem value={"cz"}>
            <img alt='cz' src='/icons/cz.png' style={{width: '1em', height: '1em', marginRight: '6px'}} />
            Český
          </MenuItem>
          <MenuItem value={"en"}>
            <img alt='en' src='/icons/uk.png' style={{ width: '1em', height: '1em', marginRight: '6px' }} />
            English
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Settings;
