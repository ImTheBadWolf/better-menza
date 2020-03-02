import * as React from "react";

import { Avatar, Tooltip } from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import translations from "../translations.json";

interface IProps {
	types: Array<'vegetarian' | 'glutenFree' | 'chef'>,
	languageID:number
}

const Tags: React.FC<IProps> = ({ types, languageID }) => {

	return (
		<AvatarGroup style={{
			position: 'absolute',
			top: '-15px'
		}}>
		{
			types.map((type, index)=>
				<Tooltip title={translations.submodules.mealList.tags[type].title[languageID]} disableFocusListener disableTouchListener key={index}>
					<Avatar alt={type} src={translations.submodules.mealList.tags[type].src} style={{ border: '1px solid #707070', width: '30px', height: '30px', backgroundColor: translations.submodules.mealList.tags[type].color }}/>
				</Tooltip>
			)
		}
		</AvatarGroup>
	);
};

export default Tags;
