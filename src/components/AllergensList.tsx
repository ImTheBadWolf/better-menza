import * as React from "react";

import MaterialTable  from 'material-table';

import translations from "../translations.json";

const AllergensList: React.FC<{ languageID: number }> = ({ languageID}) => {

  return (
    <MaterialTable
      title={translations.leftMenu.allergens[languageID]}
      columns={[
        { title: translations.submodules.table.allergens.number[languageID], field: 'id' },
        { title: translations.submodules.table.allergens.description[languageID], field: 'description' },
      ]}
      data={translations.allergens[languageID]}
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
        maxWidth: 700,
        padding: '5px',
        marginBottom: '30px'
      }}
    />
  );
};

export default AllergensList;
