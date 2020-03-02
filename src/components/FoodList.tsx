import * as React from "react";

import FoodItem, {IFoodItemProps} from '../components/FoodItem'
import { Dialog, Slide, DialogContent } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";

const data = [
  {
    name: 'Tilapie smažená, bramborový salát s majonézou',
    id: 1,
    alergens: [1, 3, 4, 7, 9, 10, 12],
    portions: 107,
    types: ['chef', 'vegetarian'],
    price: 62.00
  },
  {
    img: '/food/1.jfif',
    name: 'Martinovský krůtí biftek, smažené hranolky',
    id: 2,
    alergens: [3, 6, 7, 9, 10, 11, 12, 13],
    portions: 107,
    types: ['glutenFree'],
    price: 55.00,
    annexes: ["kecup, kari"]
  },
  {
    img: '/food/2.jfif',
    name: 'Debrecínská vepřová plec, těstoviny',
    id: 3,
    alergens: [1, 3, 12],
    portions: 70,
    types: ['chef', 'vegetarian', 'glutenFree'],
    price: 43.00,
    annexes: ['párky', 'lečo']
  },
  {
    img: '/food/3.jfif',
    name: 'Kynuté knedlíky s meruňkami a strouhaným tvarohem',
    id: 4,
    alergens: [1, 3, 7],
    price: 54.00,
  },
  {
    img: '/food/0.jfif',
    name: 'Tilapie smažená, bramborový salát s majonézou',
    id: 1,
    alergens: [1, 3, 4, 7, 9, 10, 12],
    portions: 107,
    types: ['chef', 'vegetarian'],
    price: 62.00
  },
  {
    img: '/food/1.jfif',
    name: 'Martinovský krůtí biftek, smažené hranolky',
    id: 2,
    alergens: [3, 6, 7, 9, 10, 11, 12, 13],
    portions: 107,
    types: ['glutenFree'],
    price: 55.00,
    annexes: ["kecup, kari"]
  },
  {
    img: '/food/2.jfif',
    name: 'Debrecínská vepřová plec, těstoviny',
    id: 3,
    alergens: [1, 3, 12],
    portions: 70,
    types: ['chef', 'vegetarian', 'glutenFree'],
    price: 43.00,
    annexes: ['párky', 'lečo']
  },
  {
    img: '/food/3.jfif',
    name: 'Kynuté knedlíky s meruňkami a strouhaným tvarohem',
    id: 4,
    alergens: [1, 3, 7],
    price: 54.00,
  },
]

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />;
});



const FoodList: React.FC<{ languageID: number }> = ({ languageID}) => {

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalImg, setModalImg] = React.useState<string>("");

  const onSelect = (type: 'id' | 'img', id: number) => {
    if(type === 'id'){
      console.log("Selected: " + id)
    }
    else{
      if (data[id]?.img){
        setModalOpen(true);
        setModalImg(data[id]?.img);
      }
    }
  }
  
  return (
    <>
      {
        data.map((foodItem, index) =>
          <FoodItem
            key={index}
            id={foodItem.id}
            imgPath={foodItem.img}
            foodName={foodItem.name}
            alergens={foodItem.alergens}
            price={foodItem.price}
            annexes={foodItem?.annexes}
            portions={foodItem?.portions}
            types={foodItem?.types as IFoodItemProps['types']}
            onSelect={onSelect}
            languageID={languageID}
            />
        )
      }
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(false)}

        maxWidth={"lg"}
      >
        <DialogContent style={{ padding: '0px'}}>
          <img src={modalImg} alt="foodImage" style={{ width: '100%', height: '100%', marginBottom: '-4px' }}></img>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FoodList;
