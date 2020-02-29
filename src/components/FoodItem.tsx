import * as React from "react";


import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tags from "./Tags";
import { Button } from "@material-ui/core";


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
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
}));


export interface IFoodItemProps {
	imgPath: string,
	alergens: number[],
	price: number,
	foodName: string,
	onSelect: (type:'id'|'img' , id:number)=>void;
	id: number,
	portions?: number,
	annexes?: string[],
	types?: Array<'vegetarian'|'glutenFree'|'chef'>
}

const FoodItem: React.FC<IFoodItemProps> = ({ alergens, foodName, imgPath, portions, price, annexes, types, onSelect, id }) => {
	
	const classes = useStyles();  

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				{types && <Tags types={types} />}
				<Grid container spacing={2}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img className={classes.img} alt="foodImage" src={imgPath} onClick={() => onSelect("img", id)} />
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								<Typography gutterBottom variant="subtitle1">
									{foodName}
                </Typography>
								{portions && <Typography variant="body2" gutterBottom>
									{`Zbyva porci: ${portions}`}
								</Typography>}
								{annexes && <Typography variant="body2" color="textSecondary">
									{`(${annexes.join(",")})`}
								</Typography>}
								<Typography variant="body2" color="textSecondary">
									{`A ${alergens.join(",")}`}
								</Typography>
							</Grid>
							<Grid item>
								<Button variant="outlined" style={{ cursor: 'pointer' }} onClick={() => onSelect("id",id)}>
									Vybrat
                </Button>
							</Grid>
						</Grid>
						<Grid item>
							<Typography variant="subtitle1">{`${price} Kc`}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default FoodItem;
