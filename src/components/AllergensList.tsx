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
      data={[
        { id: '1', description: 'Obiloviny obsahující lepek'},
        { id: '2', description: 'Korýši' },
        { id: '3', description: 'Vejce' },
        { id: '4', description: 'Ryby' },
        { id: '5', description: 'Podzemnice olejná (arašídy)' },
        { id: '6', description: 'Sójové boby (sója)' },
        { id: '7', description: 'Mléko' },
        { id: '8', description: 'Skořápkové plody' },
        { id: '9', description: 'Celer' },
        { id: '10', description: 'Hořčice' },
        { id: '11', description: 'Sezamová semena (sezam)' },
        { id: '12', description: 'Oxid siřičitý a siřičitany' },
        { id: '13', description: 'Vlčí bob (lupina)' },
        { id: '14', description: 'Měkkýši' },
      ]}
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
