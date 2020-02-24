import * as React from "react";

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import Tag from "./Tag";

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


interface IProps {
	imgPath: string,
	alergens: number[],
	price: number,
	foodName: string
	portions?: number,
	annexes?: string[],
	types?: Array<'vegetarian'|'glutenFree'|'chef'>
}

const FoodItem: React.FC<IProps> = ({ alergens, foodName, imgPath, portions, price, annexes, types}) => {
	
	const classes = useStyles();  

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
			{types && (
					<AvatarGroup style={{
						position: 'absolute',
						top: '-15px'}}>
						{types.map((type: 'vegetarian' | 'glutenFree' | 'chef') => <Tag type={type}/> )}	
					</AvatarGroup>
			)}
				<Grid container spacing={2}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img className={classes.img} alt="foodImage" src={imgPath} />
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
								<Typography variant="body2" style={{ cursor: 'pointer' }}>
									Vybrat
                </Typography>
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
