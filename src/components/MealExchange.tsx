import * as React from "react";

import MaterialTable  from 'material-table';
import { Checkbox } from "@material-ui/core";

const MealExchange: React.FC = () => {

  return (
    <MaterialTable
      title="Burza"
      columns={[
        { title: 'Dátum', field: 'date' },
        { title: 'Jídlo', field: 'meal' },
        { title: 'Alt', field: 'id' },
        { title: 'Výdejna', field: 'canteen' },
        { title: 'Cena', field: 'price' },
        { title: 'Vybrat',
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
