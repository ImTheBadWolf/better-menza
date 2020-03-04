import * as React from "react";
import axios from 'axios';

import FoodItem, {IFoodItemProps} from '../components/FoodItem'
import { Dialog, Slide, DialogContent } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";

import config from '../config.json'


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />;
});


const FoodList: React.FC<{ languageID: number, canteen: string }> = ({ languageID, canteen}) => {

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalImg, setModalImg] = React.useState<string>("");
  const [foodData, setFoodData] = React.useState<any>();

  React.useMemo(() => {
    const payload= { 'command': 'meals', 'canteen': canteen }
    axios.post(config.backend, payload)
      .then((res: any) => {
        setFoodData(res.data.data);
      })
  },[canteen]);



  const onSelect = (type: 'id' | 'img', id: number) => {
    if(type === 'id'){
      console.log("Selected: " + id)
    }
    else{
      if (foodData && foodData[id]?.img){
        setModalOpen(true);
        setModalImg(foodData[id]?.img);
      }
    }
  }
  
  
  return (
    <>
      {
        foodData && foodData.map((foodItem:any, index:any) =>
          <FoodItem
            key={index}
            selectionId={index}
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
