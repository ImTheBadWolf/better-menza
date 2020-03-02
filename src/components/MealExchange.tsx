import * as React from "react";

import MaterialTable  from 'material-table';
import { Checkbox } from "@material-ui/core";

import translations from "../translations.json";

const MealExchange: React.FC<{ languageID: number }> = ({ languageID}) => {

  return (
    <MaterialTable
      title={translations.leftMenu.mealExchange[languageID]}
      columns={[
        { title: translations.leftMenu.date[languageID], field: 'date' },
        { title: translations.submodules.table.meal[languageID], field: 'meal' },
        { title: 'Id', field: 'id' },
        { title: translations.leftMenu.canteen[languageID], field: 'canteen' },
        { title: translations.submodules.table.price[languageID], field: 'price' },
        {
          title: translations.submodules.table.select[languageID],
          render: (row)=> <Checkbox/>
        },
      ]}
      data={[
        { id: '1', meal: 'Kynuté knedlíky s meruňkami a strouhaným tvarohem', date: '2.3.2020', mealType: "Oběd", canteen:"Snack Bar", price: "74 Kč"},
        { id: '4', meal: 'Tilapie smažená, bramborový salát s majonézou', date: '2.3.2020', mealType: "Oběd", canteen: "Menza 5", price:"60 Kč" },
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
        maxWidth: 1500,
        padding: '5px',
        marginBottom: '30px'
      }}
    />
  );
};

export default MealExchange;
