import * as React from "react";


import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tags from "./Tags";
import { Button } from "@material-ui/core";

import translations from "../translations.json";


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		position: 'relative'
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 700,
		marginBottom: '30px'
	},
	image: {
		width: 128,
		height: 128,
		padding: '5px 0px'
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
		borderRadius: '2px'
	},
}));


export interface IFoodItemProps {
	imgPath?: string,
	alergens: number[],
	price: number,
	foodName: string,
	onSelect: (type:'id'|'img' , id:number)=>void;
	id: number,
	portions?: number,
	annexes?: string[],
	types?: Array<'vegetarian'|'glutenFree'|'chef'>,
	languageID: number,
	selectionId: number
}

const FoodItem: React.FC<IFoodItemProps> = ({ alergens, selectionId, foodName, imgPath, portions, price, annexes, types, onSelect, id, languageID }) => {
	
	const classes = useStyles();  

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				{types && <Tags types={types} languageID={languageID} />}
				<Grid container spacing={2}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img className={classes.img} alt="foodImage" src={imgPath ? ("data:image/png;base64,"+imgPath) : '/food/noPhoto.png'} onClick={() => onSelect("img", selectionId)} />
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								<Typography gutterBottom variant="subtitle1" >
									{`${id}. ${foodName}`}
                </Typography>
								{portions && <Typography variant="body2" gutterBottom color='textSecondary'>
									{`${translations.submodules.mealList.portions[languageID]}: ${portions}`}
								</Typography>}
								{annexes && <Typography variant="body2" color="textSecondary">
									{`(${annexes.join(",")})`}
								</Typography>}
								<Typography variant="body2" color="textSecondary">
									{`A ${alergens.join(",")}`}
								</Typography>
							</Grid>	
						</Grid>

						<Grid item style={{position: 'relative', marginLeft: '6px'}}>
								<Grid item style={{ marginBottom: '35px'}} >
									<Typography variant="subtitle1">{`${price} Kč`}</Typography>
								</Grid>
								<Grid item style={{position: 'absolute', bottom: '0', right: '0'}}>
									<Button variant="outlined" style={{ cursor: 'pointer' }} onClick={() => onSelect("id", selectionId)} disabled>
										{translations.submodules.table.select[languageID]}
									</Button>
								</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default FoodItem;
