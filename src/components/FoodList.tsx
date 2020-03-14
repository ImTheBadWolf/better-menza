import * as React from "react";
import axios from 'axios';

import FoodItem, {IFoodItemProps} from '../components/FoodItem'
import { Dialog, Slide, DialogContent, Typography, CircularProgress } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";

import config from '../config.json'
import translations from '../translations.json'
import { useHistory } from "react-router-dom";


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />;
});


const FoodList: React.FC<{ languageID: number, canteen: string , date: string}> = ({ languageID, canteen, date}) => {

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalImg, setModalImg] = React.useState<string>("");
  const [foodData, setFoodData] = React.useState<any>();
  const history = useHistory()


  const [canteens] = React.useState<any>({
    "Menza 5": 1,
    "Aula": 2,
    "Snack Bar": 3,
    "FAST":  5,
    "FBI": 4,
    "Pizzeria": 9,
    "Kruhovka": 6,
    "Bufet EkF": 11,
  });
  const pictoGrams:any = {
    "-2": "glutenFree",
    "-3": "vegetarian",
    "6": "chef",
    "-1": "chef",
  }

  const getCookie = (name:string) => { //move to functions file
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts?.pop()?.split(";")?.shift();
  }
  function deleteCookie(name:string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  React.useMemo(() => {
    setFoodData("loading")
    const payload= { 
      'command': 'meals',
      'canteen': canteens[canteen],
      'date': date,
      'session': getCookie("sessionToken"),
      'lang': translations.languages.keys[languageID]
    }
    axios.post(config.backend, payload)
      .then((res: any) => {
        if(res.data["error"]==="Invalid session"){
          /* deleteCookie("login")
          deleteCookie("fullName")
          deleteCookie("sessionToken")
          deleteCookie("balance")
          history.push("/login") */
        }
        else
          setFoodData(res.data);
      })
      .catch((error:any) =>{
        console.log(error);
        setFoodData([]);
      })
  }, [canteen, canteens, date, languageID, history]);



  const onSelect = (type: 'id' | 'img', id: number) => {
    if(type === 'id'){
      console.log("Selected: " + id)
    }
    else{
      if (foodData && foodData[id]?.imgB){
        setModalOpen(true);
        setModalImg(foodData[id]?.imgB);
      }
    }
  }
  
  return (
    <>
      {
        (foodData==="loading")?
          (<div style={{width: '100%', textAlign: 'center'}} ><CircularProgress/></div>)
        :(
          (!!foodData?.length && !foodData["Message"]) ?
          (
            foodData.map((foodItem:any, index:any) =>{
              if(foodItem.MealAlt===0)
                return undefined;

              return(
                <FoodItem
                  key={index}
                  selectionId={index}
                  id={foodItem.MealAlt}
                  imgPath={foodItem.imgB}
                  foodName={foodItem.MealAltDescription}
                  alergens={[0, 0, 0]}
                  price={foodItem.Price}
                  /* annexes={} */
                  /* portions={foodItem?.portions} */
                  types={foodItem?.PictogramIds?.map((id:number)=>pictoGrams[id]) as IFoodItemProps['types']}
                  onSelect={onSelect}
                  languageID={languageID}
                />
              )}
            )
          )
          :(
            <Typography style={{textAlign: 'center', fontSize: '20px'}}>No data</Typography>
          )
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
          <img src={"data:image/png;base64,"+modalImg} alt="foodImage" style={{ width: '100%', height: '100%', marginBottom: '-4px' }}></img>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FoodList;
