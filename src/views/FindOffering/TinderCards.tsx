import React, {FC, ReactElement, useContext, useState} from "react"
import "./TinderCards.css"
import TinderCard from "react-tinder-card"
import DetailPage from "./DetailPage"
import { render } from "react-dom"
import { OffersContext, UserContext } from "../../App"
import { IHousingOffer } from "../../models/housingOffer"

interface Props {
	title?: string
}

const TinderCards: FC<Props> = ({ title }): ReactElement => {
	const offerContext = useContext(OffersContext)
	const listings = offerContext.offers

	const swiped = (direction: string, nameToDelete: string) => {
		// console.log("removing" + nameToDelete + direction)
		if (direction === 'up') {
			//    console.log("asd")
		}else if (direction === 'right') {
			//    console.log("asd")
		}

	}
	const outOfFrame = (name: string) => {
		// console.log("someone has left the party" + name)
	}

	return (
		<div className={"tinderCards"}>
			<div className={"tinderCards_cardContainer"}>
				{listings.map((listing) => (
					<div className={"swipe"}>
						<TinderCard
							key={listing.title}
							preventSwipe={["down"]}
							onSwipe={(dir: string) => swiped(dir, listing.description)}
							onCardLeftScreen={() => outOfFrame(listing.description)}
						>
							<div
								style={{ backgroundImage: `url(${listing.images[0]})` }}
								className={"card"}
							>
								<div className={'offer__description'}>
									<p id={'listing__title'}>{listing.title}</p>
									<div className={"details_text"}>{listing.description}</div>
								</div>
								<div className={'toplevel_info'}>
									<p id={'details_title'}>{listing.price.amount + " " + listing.price.currency}</p>
									<div className={"details_text"}>{listing.location.address + ", " + listing.location.zipCode + ", " + listing.location.city}</div>
								</div>
								<div className={'badges'}>
									<p id={'details_title'}>{"Roommates: " + listing.flatmates.length}</p>
									<div className={"details_text"}>{"Room size : " + listing.roomSize}</div>
									<div className={"details_text"}>{"Year constructed: " + listing.yearConstructed}</div>
									<div className={"details_text"}>{"Furnished : " + listing.furnished}</div>
								</div>
							</div>
						</TinderCard>
					</div>
				))}
			</div>
		</div>
	)
}

export default TinderCards
