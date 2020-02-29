import * as React from "react";

import { Avatar, Tooltip } from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';

interface IProps {
	types: Array<'vegetarian' | 'glutenFree' | 'chef'>
}

const paths = {
	vegetarian: { src: '/icons/carrot.png', title: 'Vegetarianske jidlo', color: '#4caf50'},
	glutenFree: { src: '/icons/glutenFree.png', title: 'Bezlepkove jidlo', color: '#ffeb3b'},
	chef: { src: '/icons/chef.png', title: 'Vyberove jidlo', color: '#03a9f4'}
}

const Tags: React.FC<IProps> = ({ types }) => {

	return (
		<AvatarGroup style={{
			position: 'absolute',
			top: '-15px'
		}}>
		{
			types.map((type, index)=>
				<Tooltip title={paths[type].title} disableFocusListener disableTouchListener key={index}>
					<Avatar alt={type} src={paths[type].src} style={{ border: '1px solid #707070', width: '30px', height: '30px', backgroundColor: paths[type].color }}/>
				</Tooltip>
			)
		}
		</AvatarGroup>
	);
};

export default Tags;
