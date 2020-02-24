import * as React from "react";

import { Avatar, Tooltip } from "@material-ui/core";


interface IProps {
	type: 'vegetarian' | 'glutenFree' | 'chef'
}

const paths = {
	vegetarian: { src: '/icons/carrot.png', title: 'Vegetarianske jidlo', color: '#4caf50'},
	glutenFree: { src: '/icons/glutenFree.png', title: 'Bezlepkove jidlo', color: '#ffeb3b'},
	chef: { src: '/icons/chef.png', title: 'Vyberove jidlo', color: '#03a9f4'}
}

const Tag: React.FC<IProps> = ({ type }) => {

	return (
		
		<Tooltip title={paths[type].title}>
			<Avatar alt={type} src={paths[type].src} style={{border: '1px solid #707070', width: '30px', height: '30px', backgroundColor: paths[type].color}}/>
		</Tooltip>
	);
};

export default Tag;
