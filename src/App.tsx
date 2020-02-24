import React from 'react';

import FoodItem from '../src/components/FoodItem'

function App() {
  return (
    <>
    <div style={{marginBottom: '30px'}}></div>
      <FoodItem
        imgPath={'https://stravovani.vsb.cz/WebKredit/ImageFromDb.aspx?ImgID=943781'}
        foodName={'Tilapie smažená, bramborový salát s majonézou'}
        alergens={[1, 3, 4, 7, 9, 10, 12]}
        portions={107}
        types={['chef', 'vegetarian']}
        price={62.00} />
      <FoodItem
        imgPath={'https://stravovani.vsb.cz/WebKredit/ImageFromDb.aspx?ImgID=943811'}
        foodName={'	Martinovský krůtí biftek, smažené hranolky'}
        alergens={[3, 6, 7, 9, 10, 11, 12, 13]}
        annexes={["kecup, kari"]}
        types={['glutenFree']}
        price={55.00} />
      <FoodItem
        imgPath={'https://stravovani.vsb.cz/WebKredit/ImageFromDb.aspx?ImgID=943812'}
        foodName={'Debrecínská vepřová plec, těstoviny'}
        alergens={[1, 3, 12]}
        annexes={['párky','lečo']}
        types={['chef', 'vegetarian', 'glutenFree']}
        portions={70}
        price={43.00} />
      <FoodItem
        imgPath={'https://stravovani.vsb.cz/WebKredit/ImageFromDb.aspx?ImgID=943813'}
        foodName={'Kynuté knedlíky s meruňkami a strouhaným tvarohem'}
        alergens={[1, 3, 7]}
        price={54.00} />
    </>
  );
}

export default App;
