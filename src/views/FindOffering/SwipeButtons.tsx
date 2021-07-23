import React, { useContext } from "react"
import "./SwipeButtons.css"
import ReplayIcon from "@material-ui/icons/Replay"
import CloseIcon from "@material-ui/icons/Close"
import StarRateIcon from "@material-ui/icons/StarRate"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FlashOnIcon from "@material-ui/icons/FlashOn"
import IconButton from "@material-ui/core/IconButton"
import { IFilter } from "../../models/filter"
import { FilterContext, UserContext } from "../../App"
import { useHistory } from "react-router-dom"
import FilterView from "../Filter/FilterView"


function SwipeButtons() {
	const filterContext = useContext(FilterContext)
	const handlePersonalPreferences = () => {
		const newFilter: IFilter = {
			...filterContext.filter,
			isShown: true,
		}
		filterContext.setFilter(newFilter)
	}
	return (
		<div className={"swipeButtons"}>
			<div className="swipeButtons">
				{/*<IconButton className="swipeButtons__repeat">*/}
				{/*	<ReplayIcon fontSize="large" />*/}
				{/*</IconButton>*/}

				<IconButton className="swipeButtons__left">
					<CloseIcon fontSize="large" />
				</IconButton>

				{/*<IconButton className="swipeButtons__star">*/}
				{/*	<StarRateIcon fontSize="large" />*/}
				{/*</IconButton>*/}

				<IconButton className="swipeButtons__right">
					<FavoriteIcon fontSize="large" />
				</IconButton>

				<IconButton className="swipeButtons__lightning" onClick={handlePersonalPreferences}>
					<FlashOnIcon fontSize="large" />
				</IconButton>
				< FilterView />
			</div>
		</div>
	)
}

export default SwipeButtons
